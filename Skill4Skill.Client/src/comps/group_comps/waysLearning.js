import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiMethod } from "../../services/apiService";
import { BeatLoader } from "react-spinners";

function RentalCarInfo(props) {
  let params = useParams();
  const [ways, setWays] = useState([]);
  const [flag, setFlag] = useState(false);
  const nav = useNavigate();
  let subject = params.subject;

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      let url = API_URL + "/openai/chat/ways";
      let body = {
        message: `Find me ways to learn ${subject} and return it in json like this: {"ways":[{"link:""http..","des":"bla","linkName":"aa"}]}`,
      };
      const { data } = await doApiMethod(url, "POST", body);
      console.log(data);
      setWays(data.ways);
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
        <h4>We create the ways of learning path for you.</h4>
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
              Ways to learn {subject}
            </h3>
            <div className="progress mb-3" style={{ height: "25px" }}>
              <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={{ width: "100%", backgroundColor: "#007bff" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                100%
              </div>
            </div>
            {ways.map((item, index) => (
              <div key={index}>
                <p
                  className="mb-3 text-dark"
                  style={{
                    fontSize: "18px",
                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  {index + 1}. {item.des}
                </p>
                <a href={item.link}>{item.linkName}</a>
              </div>
            ))}
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
              onClick={() => {
                nav("/groupCat");
              }}
            >
              Menu
            </button>
          </div>
        </div>
        <div style={{ minHeight: "17vh" }}></div>
      </div>
    );
}

export default RentalCarInfo;
