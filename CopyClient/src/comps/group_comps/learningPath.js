import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiMethod } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

function LearningPath(props) {
  let params = useParams();
  const [steps, setSteps] = useState([]);
  const [flag, setFlag] = useState(false);
  const nav = useNavigate();
  let subject = params.subject;

  useEffect(() => {
    doApi();
  },[]);// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    try {
      let url = API_URL + "/openai/chat";
      let body = {
        message: `Build me a description of a learning path on ${subject} and return it in json like this: {"steps":["a","b" ,"c"]}`,
      };
      const { data } = await doApiMethod(url, "POST", body);
      setSteps(data.steps);
      setFlag(true);
    } catch (error) {
      alert("Error, please try again later.");
      console.log(error);
    }
  };

  if (!flag) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h4>We create the description of a learning path for you.</h4>
        <h2>
          <BeatLoader />
        </h2>
      </div>
    );
  } else
    return (
      <div className="container">
        <div style={{ minHeight: "17vh" }}></div>
        <div
          className="d-flex justify-content-center align-items-center vh-100"
          style={{ backgroundColor: "#e3f2fd" }}
        >
          <div
            className="p-5 rounded shadow-lg"
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h3
              className="mb-4 text-primary"
              style={{ fontSize: "24px", borderBottom: "2px solid #007bff" }}
            >
              Description of a Learning Path
            </h3>
            <div className="progress mb-3" style={{ height: "25px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: "50%", backgroundColor: "#007bff" }}
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                50%
              </div>
            </div>
            {steps.map((item, index) => (
              <p
                key={index}
                className="mb-3 text-dark"
                style={{
                  fontSize: "18px",
                  backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {index + 1}. {item}
              </p>
            ))}
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip id={`tooltip-top`}>Click to see ways of learning</Tooltip>
              }
            >
              <button
                className="btn btn-primary mt-3"
                style={{
                  backgroundColor: "#007bff",
                  border: "none",
                  boxShadow: "none",
                  transition: "all .3s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={()=>{nav("/groupInfo/waysLearning"+subject)}}
              >
                ways of learning
              </button>
            </OverlayTrigger>
            <button
              className="btn btn-outline-secondary mt-3 ml-2"
              style={{ border: "none", transition: "all .3s" }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = "#007bff";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = "";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={()=>{nav(-1)}}
            >
              Go Back
            </button>
          </div>
        </div>
        <div style={{ minHeight: "17vh" }}></div>
      </div>
    );
}

export default LearningPath;
