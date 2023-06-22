import { toast } from "react-toastify";
import React, { useEffect, useState, useRef } from "react";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import AuthClientComp from "../users_comps/authClientComp";
import { useNavigate } from "react-router-dom";
import { Tab, Nav } from "react-bootstrap";
import "../css/barterForm.css";
import { IconButton, Slider } from "@mui/material";

function BarterForm(props) {
  const [ar, setAr] = useState([]);
  const [user, setUser] = useState({});
  const [listOption, setListOption] = useState([]);
  const [listInterestedOption, setListInterestedOption] = useState([]);
  const [level, setLevel] = useState(3);
  const nav = useNavigate();
  let inputCatRef = useRef();
  let inputSubCatRef = useRef();
  let inputCatInterestedRef = useRef();
  let inputSubCatInterestedRef = useRef();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/categoriesGroup";
    let resp = await doApiGet(url);
    setAr(resp.data);
    let url2 = API_URL + "/users/myInfo";
    let resp2 = await doApiGet(url2);
    setUser(resp2.data);
    let checked = resp2.data.learning_preference;
    if (!checked) checked = "both";
    updateChecked(checked);
  };

  const getList = async () => {
    let input_val = inputCatRef.current.value;
    let place = input_val.indexOf("*");
    let cat = input_val.slice(0, place);
    let url = API_URL + "/group/?cat=" + cat;
    let resp = await doApiGet(url);
    setListOption(resp.data);
  };
  const getListInterested = async () => {
    let input_val = inputCatInterestedRef.current.value;
    let place = input_val.indexOf("*");
    let cat = input_val.slice(0, place);
    let url = API_URL + "/group/?cat=" + cat;
    let resp = await doApiGet(url);
    setListInterestedOption(resp.data);
  };

  const addKnowledge = async (e) => {
    e.preventDefault();
    let inputCat = inputCatRef.current.value;
    let inputSubCat = inputSubCatRef?.current?.value;
    if (inputSubCat === undefined) {
      toast.warning("Please fill in all fields");
      return;
    }
    let place = inputCat.indexOf("*");
    let catNumber = inputCat.slice(0, place);
    let place2 = user.knowledge.findIndex((obj) => obj.subCat === inputSubCat);
    if (place2 != -1) {
      toast.warning("this skill already exist");
      return;
    }
    nav("/barterForm/testSkill" + inputSubCat + "*" + catNumber + "*" + level);
  };
  const addInterested = async (event) => {
    event.preventDefault();
    let obj = {};
    let inputCat = inputCatInterestedRef.current.value;
    let inputSubCat = inputSubCatInterestedRef.current.value;
    let place = inputCat.indexOf("*");
    let catNumber = inputCat.slice(0, place);
    let place2 = user.interested.findIndex((obj) => obj.subCat === inputSubCat);
    if (place2 != -1) {
      toast.warning("this skill already exist");
      return;
    }
    let place3 = user.knowledge.findIndex((obj) => obj.subCat === inputSubCat);
    if (place3 != -1) {
      toast.warning("You know the knowledge you are interested in learning");
      return;
    }
    obj["catNum"] = catNumber;
    obj["subCat"] = inputSubCat;
    obj["id"] = Math.floor(Math.random() * 9999999);
    let tempUser = { ...user };
    tempUser.interested.push(obj);
    let url = API_URL + "/users/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", tempUser);
      if (resp.data.modifiedCount) {
        toast.success("User updated");
        doApi();
      } else {
        toast.warning("you not change nothing");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  };

  async function deleteKnowledge(id) {
    let place = user.knowledge.findIndex((obj) => obj.id === id);
    user.knowledge.splice(place, 1);
    let url = API_URL + "/users/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", user);
      if (resp.data.modifiedCount) {
        toast.warning("Skill deleted");
        doApi();
      } else {
        toast.warning("you not change nothing");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  }

  async function deleteInterested(id) {
    let place = user.knowledge.findIndex((obj) => obj.id === id);
    user.interested.splice(place, 1);
    let url = API_URL + "/users/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", user);
      if (resp.data.modifiedCount) {
        toast.warning("Skill deleted");
        doApi();
      } else {
        toast.warning("you not change nothing");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  }
  function updateChecked(value) {
    const radioGroup = document.getElementsByName("flexRadioDefault");
    radioGroup.forEach((radioInput) => {
      if (radioInput.value === value) {
        radioInput.checked = true;
      } else {
        radioInput.checked = false;
      }
    });
  }
  async function handleRadioClick(event) {
    const clickedInput = event.target;
    const radioGroup = document.getElementsByName("flexRadioDefault");
    radioGroup.forEach((radioInput) => {
      if (radioInput !== clickedInput) {
        radioInput.checked = false;
      } else {
        radioInput.checked = true;
      }
    });
    let tempUser = { ...user };
    tempUser.learning_preference = clickedInput.value;
    setUser(tempUser);
    let url = API_URL + "/users/" + user._id;
    try {
      let resp = await doApiMethod(url, "PUT", tempUser);
      if (resp.data.modifiedCount) {
        doApi();
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  }
  return (
    <div className="container">
      <AuthClientComp />
      <div style={{ minHeight: "20vh" }}></div>

      <Tab.Container defaultActiveKey="knowledge">
        <form className="col-md-8 p-3 shadow mx-auto h4 form-design text-dark">
          <h1 className="text-center my-5">
            <i className="fa fa-lastfm me-4 mb-2" aria-hidden="true"></i>Barter
            Form
          </h1>

          <Nav variant="tabs" className="mb-3 justify-content-center">
            <Nav.Item>
              <Nav.Link
                eventKey="knowledge"
                className="text-dark font-weight-bold"
              >
                Knowledge
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="interested"
                className="text-dark font-weight-bold"
              >
                Interested in learning
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="learningMode"
                className="text-dark font-weight-bold"
              >
                Learning Mode
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="knowledge">
              <div className="d-flex flex-column align-items-center">
                <h2 className="text-center">
                  <i className="fa fa-lastfm me-4" aria-hidden="true"></i>
                  Knowledge
                </h2>
                <div className="d-flex flex-column flex-md-row  mb-5 justify-content-center align-items-center w-75">
                  <div className="mx-2 text-center">
                    <select
                      className="form-select color-black me-4"
                      onChange={getList}
                      ref={inputCatRef}
                      required
                    >
                      <option key="1">Choose Category</option>
                      {ar.map((item) => {
                        return (
                          <option
                            value={item.short_id + "*" + item.name}
                            key={item._id}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mx-2 mt-3 mt-md-0 text-center">
                    {listOption.length === 0 ? (
                      <select className="form-select color-black me-4">
                        <option>Choose Subject</option>
                      </select>
                    ) : (
                      <select
                        className="form-select me-4"
                        ref={inputSubCatRef}
                        required
                      >
                        {listOption.map((item) => {
                          return (
                            <option value={item.name} key={item._id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                  <div
                    className="mx-2 d-flex justify-content-center align-items-center"
                    style={{ width: "26vw" }}
                  >
                    <span className="me-2">Level</span>
                    <Slider
                      defaultValue={3}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={1}
                      max={10}
                      onChange={(event, newValue) => {
                        setLevel(newValue);
                      }}
                    />
                  </div>
                  <div>
                    <button
                      className="btn btn-dark ms-2"
                      onClick={addKnowledge}
                    >
                      +
                    </button>
                  </div>
                </div>
                {user?.knowledge ? (
                  <div className="d-flex flex-column align-items-center w-75">
                    {user.knowledge
                      .sort((a, b) => b.subCat.length - a.subCat.length)
                      .map((item, key) => (
                        <div
                          key={key}
                          className="d-flex align-items-center"
                          style={{
                            width: "100%",
                            height: "auto",
                            marginBottom: "10px",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            className="col-8 col-sm-12"
                            style={{ width: "30%" }}
                          >
                            {item.subCat}
                          </p>
                          <div style={{ width: "68%" }}>
                            <Slider
                              defaultValue={+item.level}
                              step={1}
                              marks
                              min={1}
                              max={10}
                              disabled
                              color="secondary"
                            />
                          </div>
                          <div className="ms-3">
                            <IconButton
                              aria-label="delete"
                              onClick={() => deleteKnowledge(item.id)}
                              className="text-danger badge text-center mx-2 btnLog align-self-baseline"
                              style={{
                                width: "42px",
                                padding: "5px 6px 8px 5px",
                                marginTop: 0,
                              }}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </IconButton>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            </Tab.Pane>

            <Tab.Pane eventKey="interested">
              <div className="d-flex flex-column align-items-center">
                <h2 className="text-center">
                  <i className="fa fa-lastfm me-4" aria-hidden="true"></i>
                  Interested in learning
                </h2>
                <div className="d-flex mb-5 justify-content-center align-items-center">
                  <div className="mx-2">
                    <select
                      className="form-select color-black me-4"
                      onChange={getListInterested}
                      ref={inputCatInterestedRef}
                    >
                      <option key="1">Choose Category</option>
                      {ar.map((item) => {
                        return (
                          <option
                            value={item.short_id + "*" + item.name}
                            key={item._id}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="d-flex justify-content-center">
                    {listInterestedOption.length === 0 ? (
                      <div>
                        <select className="form-select color-black me-4">
                          <option>Choose Subject</option>
                        </select>
                      </div>
                    ) : (
                      <div>
                        <select
                          className="form-select color-black me-4"
                          ref={inputSubCatInterestedRef}
                        >
                          {listInterestedOption.map((item) => {
                            return (
                              <option value={item.name} key={item._id}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    )}
                  </div>
                  <div>
                    <button
                      className="btn btn-dark mx-2"
                      onClick={addInterested}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              {user?.interested
                ? user.interested
                    .sort((a, b) => b.subCat.length - a.subCat.length)
                    .map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="d-flex justify-content-center my-1"
                        >
                          <p>{item.subCat}</p>
                          <IconButton
                            onClick={() => deleteInterested(item.id)}
                            className="text-danger badge text-center mx-2 btnLog align-self-baseline"
                            style={{
                              width: "42px",
                              padding: "5px 6px 8px 5px",
                              marginTop: 0,
                            }}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </IconButton>
                        </div>
                      );
                    })
                : null}
            </Tab.Pane>
            <Tab.Pane eventKey="learningMode">
              <div className="d-flex flex-column align-items-center mb-3">
                <h2 className="text-center mb-4">
                  <i className="fa fa-lastfm me-4" aria-hidden="true"></i>
                  Learning Mode
                </h2>
                <div className="d-flex flex-column align-items-center w-50">
                  <div className="form-check d-flex justify-content-between mb-2">
                    <label
                      className="form-check-label me-3"
                      htmlFor="flexRadioDefault1"
                    >
                      Online
                    </label>
                    <label className="switch">
                      <input
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onClick={handleRadioClick}
                        value="online"
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="form-check d-flex justify-content-between mb-2">
                    <label
                      className="form-check-label"
                      style={{ marginRight: "12px" }}
                      htmlFor="flexRadioDefault2"
                    >
                      Frontal
                    </label>
                    <label className="switch">
                      <input
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onClick={handleRadioClick}
                        value="frontal"
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="form-check d-flex justify-content-between mb-2">
                    <label
                      className="form-check-label"
                      style={{ marginRight: "30px" }}
                      htmlFor="flexRadioDefault3"
                    >
                      Both
                    </label>
                    <label className="switch">
                      <input
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault3"
                        onClick={handleRadioClick}
                        value="both"
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </form>
      </Tab.Container>

      <div style={{ minHeight: "10vh" }}></div>
    </div>
  );
}

export default BarterForm;
