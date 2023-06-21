import React from "react";
import "../css/message.css";
import { FaMap } from "react-icons/fa";

function Message(props) {
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
      <h3 className="mt-4 mb-4 p-4">
        Discover and connect with learners near you!
      </h3>
      <h5>
        Here you can explore a map of passionate learners in your area who are
        eager to share their knowledge and learn from others.
      </h5>
      <button
        onClick={() => {
          let message = document.querySelector(".message");
          message.style.display = "none";
        }}
        className="btn"
      >
        Let's Start!
      </button>
    </div>
  );
}

export default Message;
