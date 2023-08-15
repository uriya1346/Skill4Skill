const express = require("express");
const { UserModel } = require("../models/userModel");
const { auth } = require("../middlewares/auth");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

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
    console.log(json);
    
    res.json(json);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.get("/suggestions", auth, async (req, res) => {
//   try {
//     let myser = await UserModel.findOne(
//       { _id: req.tokenData._id },
//       { password: 0 }
//     );

//     // Fetch my user
//     // let myUser = await UserModel.findOne(
//     //   { _id: req.tokenData._id },
//     //   { password: 0 }
//     // );

//     // // Create a short version of myUser
//     // let myUserShortJson = {
//     //   interested: myUser.interested.map((int) => int.subCat),
//     //   knowledge: myUser.knowledge.map((know) => know.subCat),
//     // };

//     // // Fetch the users
//     // let usersList = await UserModel.find({_id: {$ne: myUser._id}}, { password: 0 });

//     // // Create a shortened list
//     // let usersShortJson = usersList.map((user) => {
//     //   return {
//     //     id: user._id,
//     //     interested: user.interested.map((int) => int.subCat),
//     //     knowledge: user.knowledge.map((know) => know.subCat),
//     //   };
//     // });



//     // // Format the request message
//     //   let message = `Identify potential knowledge exchange matches from ${JSON.stringify(usersShortJson)} based on the knowledge and interests of a given user ${JSON.stringify(myUserShortJson)}. The output should be a clean JSON, with no text around and no usage of usernames. Each match should contain 'id' of the user, a 'match' field illustrating the knowledge exchange, and a 'reason' detailing why the exchange would be beneficial. For instance, a match between 'React' and 'NodeJS' could have a reason like 'these 2 programming languages are tools for website development'. Exclude users with no matches. Desired JSON output example: [{id:"123",match:"JS -> nodeJS",reason:"These are similar programming languages"}].`;

//     // console.log(message);

//     // //Send request to ChatGPT
//     // const response = await axios.post(
//     //   "https://api.openai.com/v1/chat/completions",
//     //   {
//     //     messages: [
//     //       {
//     //         role: "user",
//     //         content: message,
//     //       },
//     //     ],
//     //     model: "gpt-3.5-turbo",
//     //   },
//     //   {
//     //     headers: {
//     //       Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
//     //       "Content-Type": "application/json",
//     //     },
//     //   }
//     // );
//     // console.log(response.data.choices[0].message.content);
//     // res.json(JSON.parse(response.data.choices[0].message.content))
    
//      let json = [
//   {
//     "id": "643c1b5f71ecffea9a453ca4",
//     "match": "Working with JSON in PHP -> Go for Blockchain Development",
//     "reason": "Both involve working with data in different programming languages"
//   },
//   {
//     "id": "643d4f7a656c723d33f34b68",
//     "match": "Working with JSON in PHP -> Go for Blockchain Development",
//     "reason": "Both involve working with data in different programming languages"
//   },
//   {
//     "id": "643d4ff9656c723d33f34b80",
//     "match": "Working with JSON in PHP -> Go for Blockchain Development",
//     "reason": "Both involve working with data in different programming languages"
//   },
//   {
//     "id": "643ffee3e92058eb94acc7b2",
//     "match": "Working with JSON in PHP -> Go for Blockchain Development",
//     "reason": "Both involve working with data in different programming languages"
//   }
// ]
//     res.json(json);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });
router.get("/suggestions", auth, async (req, res) => {
  try {
    let myUser = await UserModel.findOne(
      { _id: req.tokenData._id },
      { password: 0 }
    );

    // Extract the catNum values from the user's knowledge array
    let myCatNums = myUser.knowledge.map(knowledge => knowledge.catNum);

    // Find all users that have the same catNum in their knowledge array
    let suggestedUsers = await UserModel.find({
      "knowledge.catNum": { $in: myCatNums },
      _id: { $ne: req.tokenData._id } // Exclude the current user
    }, {  knowledge: 1 }); // Include only specified fields

    // Filter the knowledge array to include only matching catNum values
    suggestedUsers = suggestedUsers.map(user => {
      user.knowledge = user.knowledge.filter(knowledge => myCatNums.includes(knowledge.catNum));
      return user;
    });

    res.status(200).json(suggestedUsers);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
