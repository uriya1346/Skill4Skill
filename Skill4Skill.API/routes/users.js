const express = require("express");
const bcrypt = require("bcrypt");
const {
  validateUser,
  UserModel,
  validateLogin,
  genToken,
} = require("../models/userModel");
const { auth, authAdmin } = require("../middlewares/auth");
const router = express.Router();


router.get("/", (req, res) => {
  res.json({ msg: "Users work" });
});

router.get("/allUsers",auth, async (req, res) => {
  let data = await UserModel.find({}, { password: 0 })
  res.json(data)
})

router.get("/myInfo", auth, async (req, res) => {
  try {
    let data = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/single/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = await UserModel.findOne({ _id: userId }, { password: 0 });
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/confirmUser/:userId", auth, async (req, res) => {
  try {
    let userId = req.params.userId;
    let currentUser = await UserModel.findOne({ _id: req.tokenData._id });
    let confirmUser = await UserModel.findOne({ _id: userId });
    let currentUserObj = {};
    currentUserObj.date = Date.now();
    currentUserObj.id = userId;
    currentUser.connections.push(currentUserObj);
    let confirmUserObj = {};
    confirmUserObj.date = Date.now();
    confirmUserObj.id = req.tokenData._id;
    confirmUser.connections.push(confirmUserObj);
    const result = currentUser.requests.filter((req) => req.id !== userId);
    currentUser.requests = result;
    let data = await UserModel.updateOne(
      { _id: req.tokenData._id },
      currentUser
    );
    let data2 = await UserModel.updateOne({ _id: userId }, confirmUser);
    res.json(data2);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/deleteConnection/:userId", auth, async (req, res) => {
  try {
    let userId = req.params.userId;
    let currentUser = await UserModel.findOne({ _id: req.tokenData._id });
    let otherUser = await UserModel.findOne({ _id: userId });
    const deleteCurrentUser = currentUser.connections.filter((connection) => connection.id !== userId);
    const deleteOtherUser = otherUser.connections.filter((connection) => connection.id !== req.tokenData._id);
    currentUser.connections = deleteCurrentUser
    otherUser.connections = deleteOtherUser

    let data = await UserModel.updateOne(
      { _id: req.tokenData._id },
      currentUser
    );
    let data2 = await UserModel.updateOne(
      { _id: userId },
      otherUser
    );
    res.json(data2)
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get("/checkRole", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );
    if (user.role == "premium" || user.role == "admin") {
      res.json({ status: "ok", msg: "this user is premium/admin" });
    } else res.json(false);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/myConnections", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    res.json(user.connections);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/checkUserToken", auth, async (req, res) => {
  res.json({ status: "ok", msg: "token is good", tokenData: req.tokenData });
});

router.get("/usersList", authAdmin, async (req, res) => {
  let perPage = req.query.perPage || 20;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  try {
    let data = await UserModel.find({}, { password: 0 })
      .limit(perPage)
      .skip(page * perPage);
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.patch("/changeRole/:userId/:role", authAdmin, async (req, res) => {
  let userId = req.params.userId;
  let role = req.params.role;
  try {
    if (userId != req.tokenData._id && userId != "6268023f45f842ebf1ab3dea") {
      let data = await UserModel.updateOne({ _id: userId }, { role: role });
      res.json(data);
    } else {
      res.status(401).json({ err: "You cant change yourself or" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.patch("/changeRolePremium/:userId", auth, async (req, res) => {
  let userId = req.params.userId;
  try {
    let data = await UserModel.updateOne({ _id: userId }, { role: "premium" });
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.put("/addReviewe/:userId", auth, async (req, res) => {
  let userId = req.params.userId;
  try {
    let data = await UserModel.updateOne({ _id: userId }, { $push: { reviews: req.body }});
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  let validBody = validateUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "*****";
    return res.status(201).json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res
        .status(400)
        .json({ code: 11000, err: "Email already in system" });
    }
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  let validBody = validateLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ err: "User not found!" });
    }
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(401).json({ err: "User or password is wrong" });
    }
    res.json({ token: genToken(user._id, user.role) });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/:idEdit", auth, async (req, res) => {
  try {
    let idEdit = req.params.idEdit;
    let data = await UserModel.updateOne({ _id: idEdit }, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.delete("/:userId", auth, async (req, res) => {
  let userId = req.params.userId;
  try {
    let deleteUser = await UserModel.deleteOne({ _id: userId });
    res
      .status(200)
      .json(
        deleteUser
      );
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.patch("/updatePassword/:newpass/:mail", async (req, res) => {
  let newpass = req.params.newpass;
  let mail = req.params.mail;
  try {
      let data = await UserModel.updateOne({ email: mail }, { password: await bcrypt.hash(newpass, 10) });
      res.json(data);
   
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
