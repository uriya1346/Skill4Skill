import React, { useContext, useEffect, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { AppContext } from "../../context/shopContext";
import { Rating, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthClientComp from "./authClientComp";

function MyConnections(props) {
  let item = props.item;
  const [user, setUser] = useState([]);
  const [myUser, setMyUser] = useState([]);
  const [reviewFlag, setReviewFlag] = useState(false);
  const { setShowCart } = useContext(AppContext);
  const [rating, setRating] = React.useState(3);
  const nav = useNavigate();
  let {
    register,
    handleSubmit
  } = useForm();
  let reviewerContentRef = register("reviewerContent", {
    required: true,
    minLength: 3,
  });

  useEffect(() => {
    doApi();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/users/single/" + item.id;
    let resp = await doApiGet(url);
    setUser(resp.data);
    let url2 = API_URL + "/users/myInfo";
    let resp2 = await doApiGet(url2);
    setMyUser(resp2.data);
  };

  const deleteConnection = async (id) => {
    let url = API_URL + "/users/deleteConnection/" + id;
    let resp = await doApiGet(url);
    if (resp.data.modifiedCount) {
      toast.success("User deleted successfully");
      setShowCart("none");
    } else {
      toast.warning("there is a problem try again later");
    }
  };

  const submit = async (data) => {
    setReviewFlag(false);
    const isUserReviewed = user.reviews.some(
      (review) => review.id === myUser._id
    );
    if (isUserReviewed) {
      toast.warning("Every user is allowed to give one review.");
      return;
    }
    let obj = {
      id: myUser._id,
      date: new Date(),
      content: data.reviewerContent,
      raiting: rating,
    };
    let url = API_URL + "/users/addReviewe/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", obj);
      if (resp.data.modifiedCount) {
        toast.success("Review added successfully");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  };

  return (
    <div>
      <AuthClientComp/>
      {reviewFlag ? (
        <div className="message">
          <h1>
            <span style={{ fontSize: "3vh", padding: "8px" }}></span>
            Rate {user.first_name}
            <span style={{ fontSize: "3vh", padding: "8px" }}></span>
          </h1>
          <div className="review-header">
            <Rating
              value={rating}
              defaultValue={3}
              precision={1}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
          <form className="review-form" onSubmit={handleSubmit(submit)}>
            <div className="AddReview">
              <div className="review">
                <TextField
                  {...reviewerContentRef}
                  style={{
                    display: "flex",
                    margin: "0 40px 0 40px",
                  }}
                  className="add-review-input"
                  size="small"
                  multiline
                  {...register("reviewerContent")}
                  id="review-input"
                  placeholder="Add comment"
                  variant="standard"
                />
              </div>
            </div>

            <button className="btn" type="submit">
              Send review!
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      <div className="ms-2 d-flex justify-content-between">
        <div>
          <p className="me-3">
            {user.first_name} {user.last_name}
          </p>
        </div>
        <div className="me-3">
          <button
            onClick={() => deleteConnection(user._id)}
            className="btn btn-outline-danger badge"
            style={{ height: "4vh" }}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
          <button
            onClick={() => setReviewFlag(true)}
            className="btn btn-outline-success badge ms-1"
            style={{ height: "4vh" }}
          >
            <i className="fa fa-star" aria-hidden="true"></i>
          </button>
          <button
            onClick={() => {
              nav("/chat/" + user._id);
              setShowCart("none")
            }}
            className="btn btn-outline-success badge ms-1"
            style={{ height: "4vh" }}
          >
            <i className="fa fa-comment" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default MyConnections;
