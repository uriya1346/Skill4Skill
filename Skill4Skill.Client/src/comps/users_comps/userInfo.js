import React, { useEffect, useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/userInfo.css";
import { BeatLoader } from "react-spinners";
import AuthClientComp from "../users_comps/authClientComp";
import { motion } from "framer-motion";

function UserInfo(props) {
  const [user, setUser] = useState({});
  const [userRoleFlag, setUserRoleFlag] = useState(false);
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let nav = useNavigate();

  let firstNameRef = register("first_name", {
    required: true,
    minLength: 2,
    maxLength: 100,
  });
  let lastNameRef = register("last_name", {
    required: true,
    minLength: 2,
    maxLength: 100,
  });
  let emailRef = register("email", {
    required: true,
    minLength: 2,
    maxLength: 150,
  });

  let phoneRef = register("phone", {
    required: true,
    minLength: 2,
    maxLength: 300,
  });
  let cityRef = register("city", {
    required: true,
    minLength: 2,
    maxLength: 300,
  });
  let streetRef = register("street", {
    required: true,
    minLength: 2,
    maxLength: 300,
  });
  let homeNumberRef = register("home_number", {
    required: true,
    minLength: 2,
    maxLength: 300,
  });

  useEffect(() => {
    doApi();
  },[]);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    let resp = await doApiGet(url);
    setUser(resp.data);
    if (resp.data.role !== "admin" || resp.data.role !== "premium") {
      setUserRoleFlag(true);
      console.log(12123432);
    }
  };

  function onSubForm(formData) {
    doFormApi(formData);
  }

  const doFormApi = async (formData) => {
    let url = API_URL + "/users/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      if (resp.data.modifiedCount) {
        toast.success("User updated");
        nav(-1);
      } else {
        toast.warning("You haven't made any changes");
      }
    } catch (err) {
      console.log(err.response);
      alert("There is a problem. Please try again later.");
      nav(-1);
    }
  };

  const deleteUser = async () => {
    let url = API_URL + "/users/" + user._id;
    if (window.confirm("Are you sure?")) {
      try {
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          toast.success("User deleted successfully");
          nav("/logout");
        }
      } catch (err) {
        console.log(err.response);
        alert("There is a problem. Please try again later.");
      }
    }
  };

  return (
    <div className="container mb-5">
      <AuthClientComp />
      {!userRoleFlag ? (
        <div
          className="premium-go"
          style={{ cursor: "pointer" }}
          title="Get premium"
          onClick={() => nav("/checkoutPremium")}
        >
          <h2>
            <i className="fa fa-user-secret me-1" aria-hidden="true"></i>
            Premium User
          </h2>
        </div>
      ) : (
        ""
      )}
      <div
        className="delete-user"
        style={{ cursor: "pointer" }}
        onClick={deleteUser}
      >
        <h2>
          Delete User <i className="fa fa-trash ms-1" aria-hidden="true"></i>
        </h2>
      </div>
      <div style={{ minHeight: "15vh" }}></div>
      {user._id ? (
        <div>
          <motion.form
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit(onSubForm)}
            className="col-md-6 p-3 shadow mx-auto h4 form-design text-dark"
          >
            <h1 className="mb-4 gradi text-center ">
              <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Edit
              Information
            </h1>
            <label className="my-2">
              <i className="fa fa-user mx-2" aria-hidden="true"></i>First Name
            </label>
            <input
              defaultValue={user.first_name}
              {...firstNameRef}
              type="text"
              className="form-control"
            />
            {errors.first_name && (
              <small className="text-danger d-block">
                * Please enter a valid First Name (2 to 99 characters)
              </small>
            )}

            <label className="my-2">
              <i className="fa fa-user-o mx-2" aria-hidden="true"></i>Last Name
            </label>
            <input
              defaultValue={user.last_name}
              {...lastNameRef}
              type="text"
              className="form-control"
            />
            {errors.last_name && (
              <small className="text-danger d-block">
                * Please enter a valid Last Name (2 to 99 characters)
              </small>
            )}

            <label className="my-2">
              <i className="fa fa-envelope mx-2" aria-hidden="true"></i>Email
            </label>
            <input
              defaultValue={user.email}
              {...emailRef}
              type="text"
              className="form-control"
            />
            {errors.email && (
              <small className="text-danger d-block">
                * Please enter a valid email (2 to 150 characters)
              </small>
            )}

            <label className="my-2">
              <i className="fa fa-phone mx-2" aria-hidden="true"></i>Phone
            </label>
            <input
              defaultValue={user.phone}
              {...phoneRef}
              type="text"
              className="form-control"
            />
            {errors.phone && (
              <small className="text-danger d-block">
                * Please enter a valid phone number (2 to 300 characters)
              </small>
            )}

            <label className="my-2">
              <i className="fa fa-building mx-2" aria-hidden="true"></i>City
            </label>
            <input
              defaultValue={user.city}
              {...cityRef}
              type="text"
              placeholder="Type your city..."
              className="form-control"
            />
            {errors.city && (
              <small className="text-danger d-block">
                * Please enter a valid city (minimum 2 characters)
              </small>
            )}

            <label className="my-2">
              <i className="fa fa-road mx-2" aria-hidden="true"></i>Street
            </label>
            <input
              defaultValue={user.street}
              {...streetRef}
              type="text"
              placeholder="Type your street..."
              className="form-control"
            />
            {errors.street && (
              <small className="text-danger d-block">
                * Please enter a valid street (minimum 2 characters)
              </small>
            )}

            <label className="my-2">
              <i className="fa fa-home mx-2" aria-hidden="true"></i>Home number
            </label>
            <input
              defaultValue={user.home_number}
              {...homeNumberRef}
              type="number"
              placeholder="Type your home number..."
              className="form-control mb-4"
            />
            {errors.homeNumber && (
              <small className="text-danger d-block">
                * Please enter a valid home number (minimum 2 characters)
              </small>
            )}

            <div className="text-center mt-4">
              <button className="btnLog  me-2 my-3">Update</button>
              <Link
                to={"/barterForm"}
                className="text-center text-decoration-none btn btn-dark p-2"
              >
                Edit Knowledge
              </Link>
            </div>
          </motion.form>
          <div style={{ minHeight: "20vh" }}></div>
        </div>
      ) : (
        <h2 className="text-center">
          <BeatLoader />
        </h2>
      )}
    </div>
  );
}

export default UserInfo;
