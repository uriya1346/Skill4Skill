import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";

const randomPassword = Math.floor(Math.random() * 900000) + 100000;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);
  const [flagNewPassword, setFlagNewPassword] = useState(false);
  const [passwordVal, setPasswordVal] = useState("");
  const [newPasswordVal, setNewPasswordVal] = useState("");
  const nav = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFlag(true);
    const templateParams = {
      to_email: email,
      message: "your new password is " + randomPassword,
    };
    emailjs
      .send(
        "service_cars",
        "template_zpjnfud",
        templateParams,
        "kyexmZY3HTBCh4cHd"
      )
      .then(
        (response) => {
          //console.log("Email sent:", response.status, response.text);
        },
        (error) => {
          console.log("Email failed:", error);
        }
      );
  };
  const chechPassword = async () => {
    let message = document.querySelector(".message");
    message.style.display = "none";
    if (passwordVal == randomPassword) {
      setFlag(false);
      setFlagNewPassword(true);
    } else toast.error("the password is not match");
  };

  const updatePassword = async () => {
    let url = API_URL + `/users/updatePassword/${newPasswordVal}/${email}`;
    try {
      let resp = await doApiMethod(url, "PATCH", {});
      if (resp.data.modifiedCount) {
        toast.success(
          "youre password changes successfully to: " + newPasswordVal
        );
        nav("/login");
      }
    } catch (err) {
      toast.error("there problem try again later");
    }
  };
  return (
    <div className="container">
      <div style={{ minHeight: "20vh" }}></div>
      <form
        onSubmit={handleSubmit}
        className="col-md-6 p-3 shadow mx-auto h4 form-design text-dark text-center"
      >
        <h1 className="gradi text-center mb-3">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>FORGOT
          PASSWORD PANEL
        </h1>
        <div className="mb-3">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          className="btnLog mt-4"
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          <i className="mx-2 fa fa-sign-in" aria-hidden="true"></i>Submit
        </button>
      </form>
      {flag ? (
        <div className="message text-center">
          <h1>Enter the password</h1>
          <input
            type="text"
            className="input"
            value={passwordVal}
            onChange={(e) => setPasswordVal(e.target.value)}
          />
          <br />
          <button
            onClick={() => {
              chechPassword();
            }}
            className="btn mb-3"
          >
            GO!
          </button>
        </div>
      ) : (
        ""
      )}
      {flagNewPassword ? (
        <div className="message text-center">
          <h1>Enter the new password</h1>
          <input
            type="text"
            className="input"
            value={newPasswordVal}
            onChange={(e) => setNewPasswordVal(e.target.value)}
          />
          <br />
          <button
            onClick={() => {
              updatePassword();
            }}
            className="btn mb-3"
          >
            GO!
          </button>
        </div>
      ) : (
        ""
      )}
      <div style={{ minHeight: "50vh" }}></div>
    </div>
  );
};

export default ForgotPassword;
