const express = require("express");
const { UserModel } = require("../models/userModel");
const { auth } = require("../middlewares/auth");
const { secret } = require("../config/config");
const router = express.Router();
const axios = require("axios");

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
                  obj.name =
                    otherUsers[i].first_name + " " + otherUsers[i].last_name;
                  obj.phone = otherUsers[i].phone;
                  obj.catNum = element.catNum;
                  obj.subCat = element.subCat;
                  obj.des = element.description;
                  obj.img = otherUsers[i].img_url;
                  obj.canOfferCat = userKnowledge.catNum;
                  obj.canOfferSubCat = userKnowledge.subCat;
                  obj.userId = otherUsers[i]._id;
                  obj.city = otherUsers[i].city;
                  obj.street = otherUsers[i].street;
                  obj.homeNumber = otherUsers[i].home_number;
                  json.push(obj);
                }
              });
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
    console.log("start");
    // Fetch the users
    let usersList = await UserModel.find({}, { password: 0 });

    // Create a shortened list
    let usersShortJson = usersList.map((user) => {
      return {
        id: user._id,
        interested: user.interested.map((int) => int.subCat),
        knowledge: user.knowledge.map((know) => know.subCat),
      };
    });

    // Fetch my user
    let myUser = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );

    // Create a short version of myUser
    let myUserShortJson = {
      interested: myUser.interested.map((int) => int.subCat),
      knowledge: myUser.knowledge.map((know) => know.subCat),
    };

    // Format the request message
    let message = `Given myUser's knowledge and interests ${JSON.stringify(
      myUserShortJson
    )}, find potential users ${JSON.stringify(
      usersShortJson
    )} for knowledge exchange. Return a clean JSON with each match containing 'id' of the user, and 'match' field detailing the knowledge exchange and reason. Exclude users with no matches.`;

    console.log(message);

    // Send request to ChatGPT
    // const response = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     messages: [
    //       {
    //         role: "user",
    //         content: message,
    //       },
    //     ],
    //     model: "gpt-3.5-turbo",
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${secret.openAiapiKey}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    // // Handle the response
    // console.log(response.data.choices[0].message.content);
    // let potentialMatches = response.data.choices[0].message.content;
    // res.json(JSON.parse(response.data.choices[0].message.content))
    res.json([{}])
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
