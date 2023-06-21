const express = require("express");
const { UserModel } = require("../models/userModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    let json = [];
    let user = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );
    let otherUsers = await UserModel.find({ _id: { $ne: req.tokenData._id } });    
    for (let i = 0; i < otherUsers.length; i++) {

      otherUsers[i].knowledge.forEach((element) => {
        user.interested.forEach((item) => {
          if (
            item.catNum === element.catNum &&
            item.subCat === element.subCat
          ) {
            otherUsers[i].interested.forEach((userInterested) => {
              user.knowledge.forEach((userKnowledge) => {
                if (
                  userInterested.catNum === userKnowledge.catNum &&
                  userInterested.subCat === userKnowledge.subCat
                ) {
                    let obj = {};
                    obj.name = otherUsers[i].first_name+" "+otherUsers[i].last_name;
                    obj.phone = otherUsers[i].phone
                    obj.catNum = element.catNum;
                    obj.subCat = element.subCat;
                    obj.des = element.description;
                    obj.img = otherUsers[i].img_url
                    obj.canOfferCat = userKnowledge.catNum
                    obj.canOfferSubCat = userKnowledge.subCat
                    obj.userId = otherUsers[i]._id
                    obj.city = otherUsers[i].city
                    obj.street = otherUsers[i].street
                    obj.homeNumber = otherUsers[i].home_number
                    json.push(obj); 
                }
              })
            });

          }
        });
      });
    }
    res.json(json);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/suggestions", auth, async (req, res) => {
  try {
    // let json = [];
    let user = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );
    let matchingUsers = await UserModel.find({
      _id: { $ne: req.tokenData._id },
      knowledge: { $elemMatch: { subCat: { $in: user.interested.map(i => i.subCat) } } },
      interested: { $not: { $elemMatch: { subCat: { $in: user.knowledge.map(k => k.subCat) } } } }
    });
    res.json(matchingUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
