const express = require("express");
const axios = require("axios");
const router = express.Router();
const { secret } = require("../config/config");

router.post("/chat", async (req, res) => {
  try {
    // const message = req.body.message;
    // const response = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     messages: [
    //       {
    //           "role": "user",
    //           "content":message
    //       }
    //   ],
    //     model:"gpt-3.5-turbo"
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${secret.openAiapiKey}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log("$$$");

    // res.json(JSON.parse(response.data.choices[0].message.content));
    let json = {
      steps: [
        "Step 1: Getting Started with Raspberry Pi and Python",
        "Step 2: Basic Python Syntax and Data Types",
        "Step 3: Writing and Running Simple Python Scripts on Raspberry Pi",
        "Step 4: Understanding Loops, Conditionals and Functions in Python",
        "Step 5: Handling Files, Input and Output in Python",
        "Step 6: Interfacing with Hardware using Python on Raspberry Pi",
        "Step 7: Advanced Topics and Libraries in Python for Raspberry Pi",
        "Step 8: Building Real-World Applications and Projects with Python on Raspberry Pi",
      ],
    };
    res.json(json);
  } catch (error) {
    console.error(error); // log the error to the console for debugging
    let errorMessage = "Error with the chat request";
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
});

router.post("/chat/ways", async (req, res) => {
  try {
    // const message = req.body.message;
    // const response = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     messages: [
    //       {
    //           "role": "user",
    //           "content":message
    //       }
    //   ],
    //     model:"gpt-3.5-turbo"
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${secret.openAiapiKey}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // console.log("$$$");

    // res.json(JSON.parse(response.data.choices[0].message.content));
    let json = {
      ways: [
        {
          link: "https://www.udemy.com/topic/java-networking/",
          des: "Udemy is a popular online learning platform that offers several Java networking courses. You can choose from beginner to advanced levels and learn at your own pace.",
          linkName: "Udemy Java Networking Courses",
        },
        {
          link: "https://docs.oracle.com/javase/tutorial/networking/TOC.html",
          des: "Oracle has an extensive documentation on Java networking that covers basic concepts, protocols, and advanced topics.",
          linkName: "Oracle Java Networking Tutorial",
        },
        {
          link: "https://www.youtube.com/playlist?list=PLF82-I80PwDN0hJh6KWxhsyq_ypJtza4W",
          des: "This YouTube playlist by Telusko covers Java networking concepts and programming with practical examples.",
          linkName: "Java Networking Tutorial by Telusko",
        },
      ],
    };
    res.json(json);
  } catch (error) {
    console.error(error); // log the error to the console for debugging
    let errorMessage = "Error with the chat request";
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
});

/////////////////////waysLearning
// {
//   "ways": [
//       {
//           "link": "https://www.udemy.com/topic/java-networking/",
//           "des": "Udemy is a popular online learning platform that offers several Java networking courses. You can choose from beginner to advanced levels and learn at your own pace.",
//           "linkName": "Udemy Java Networking Courses"
//       },
//       {
//           "link": "https://docs.oracle.com/javase/tutorial/networking/TOC.html",
//           "des": "Oracle has an extensive documentation on Java networking that covers basic concepts, protocols, and advanced topics.",
//           "linkName": "Oracle Java Networking Tutorial"
//       },
//       {
//           "link": "https://www.youtube.com/playlist?list=PLF82-I80PwDN0hJh6KWxhsyq_ypJtza4W",
//           "des": "This YouTube playlist by Telusko covers Java networking concepts and programming with practical examples.",
//           "linkName": "Java Networking Tutorial by Telusko"
//       }
//   ]
// }

///////////////////learningPath
// let json=  {
//   "steps": [
//       "Step 1: Getting Started with Raspberry Pi and Python",
//       "Step 2: Basic Python Syntax and Data Types",
//       "Step 3: Writing and Running Simple Python Scripts on Raspberry Pi",
//       "Step 4: Understanding Loops, Conditionals and Functions in Python",
//       "Step 5: Handling Files, Input and Output in Python",
//       "Step 6: Interfacing with Hardware using Python on Raspberry Pi",
//       "Step 7: Advanced Topics and Libraries in Python for Raspberry Pi",
//       "Step 8: Building Real-World Applications and Projects with Python on Raspberry Pi"
//   ]
// }

/////////////////////////testSkill
//   setTimeout(() => {
//   res.json({questions:[
//       {
//         question: "What is the purpose of Java Streams?",
//         options: [
//           "To read and write data to files",
//           "To manipulate collections of objects",
//           "To create graphics and animations",
//         ],
//         answer: "To manipulate collections of objects",
//       },
//       {
//         question: "What is a terminal operation in Java Streams?",
//         options: [
//           "An operation that returns a new Stream",
//           "An operation that performs a computation and produces a result",
//           "An operation that filters elements from the Stream",
//         ],
//         answer:
//           "An operation that performs a computation and produces a result",
//       },
//       {
//         question:
//           "What is the difference between parallel and sequential Streams in Java?",
//         options: [
//           "Sequential Streams process elements in random order",
//           "Parallel Streams process elements in a single thread",
//           "Parallel Streams divide elements into multiple threads for processing",
//         ],
//         answer:
//           "Parallel Streams divide elements into multiple threads for processing",
//       },
//     ],
//   });
// }, 3000);

module.exports = router;
