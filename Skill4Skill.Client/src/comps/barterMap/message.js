import React from "react";
import "../css/message.css";
import { FaMap } from "react-icons/fa";
import { motion } from "framer-motion";

function Message() {
  const boxVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const delay = 0.15;

  return (
    <div className="message">
      <h1>
        <span style={{ fontSize: "3vh", padding: "8px" }}>
          <FaMap />
        </span>
        Welcome to Skill4Skill Map
        <span style={{ fontSize: "3vh", padding: "8px" }}>
          <FaMap />
        </span>
      </h1>
      <h3>
        Discover and connect with learners near you!
      </h3>
      <h5>
        Here you can explore a map of passionate learners in your area who are
        eager to share their knowledge and learn from others.
      </h5>
      <motion.button
        className="btn"
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: delay  }}
        onClick={() => {
          let message = document.querySelector(".message");
          message.style.display = "none";
        }}
      >
        Let's Start!
      </motion.button>
    </div>
  );
}

export default Message;
