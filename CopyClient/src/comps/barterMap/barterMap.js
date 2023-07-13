import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/barterMap.css";
import Message from "./message";
import NavMap from "./navMap";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import AuthClientComp from "../users_comps/authClientComp";
import { SHOP_TOKEN } from "../../services/localService";

function BarterMap(props) {
  const [viewport, setViewport] = useState({
    latitude: 32.075874,
    longitude: 34.800098,
    zoom: 12.7,
  });
  const [ar, setAr] = useState([]);
  const [style, setStyle] = useState("mapbox://styles/mapbox/streets-v11");
  const [selectedUser, setSelectedUser] = useState(null);
  const [alreadyConnect, setAlreadyConnect] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [user, setUser] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    if (localStorage[SHOP_TOKEN]) {
      doApi();
      navigator.geolocation.getCurrentPosition((pos) => {
        setViewport({
          ...viewport,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
      const listener = (e) => {
        if (e.key === "Escape") {
          setSelectedUser(null);
        }
      };
      window.addEventListener("keydown", listener);
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }
  }, [style]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let urlMyInfo = API_URL + "/users/myInfo";
    let respMyInfo = await doApiGet(urlMyInfo);
    setUser(respMyInfo.data);
    let url = API_URL + "/barter";
    let resp = await doApiGet(url);

    const filteredData = resp.data.filter((obj) => obj.userId);
    const groupedData = filteredData.reduce((groups, obj) => {
      const userId = obj.userId;
      if (!groups[userId]) {
        groups[userId] = [];
      }
      groups[userId].push(obj);
      return groups;
    }, {});
    const array = [];
    for (const userId in groupedData) {
      const group = groupedData[userId];
      if (group.length > 1) {
        let obj = group[0];
        for (let i = 1; i < group.length; i++) {
          if (!obj.subCat.includes(group[i].subCat))
            obj.subCat = obj.subCat + ", " + group[i].subCat;
          if (!obj.canOfferSubCat.includes(group[i].canOfferSubCat))
            obj.canOfferSubCat =
              obj.canOfferSubCat + ", " + group[i].canOfferSubCat;
          if (!obj.canOfferCat.includes(group[i].canOfferCat))
            obj.canOfferCat = obj.canOfferCat + "," + group[i].canOfferCat;
          if (!obj.catNum.includes(group[i].catNum))
            obj.catNum = obj.catNum + "," + group[i].catNum;
        }
        array.push(obj);
      } else {
        array.push(group[0]);
      }
    }

    const requests = array.map(async (item) => {
      let [lon, lat] = await doLocation(
        item.city,
        item.street,
        item.homeNumber
      );
      return { ...item, lon, lat };
    });
    const resultArray = await Promise.all(requests);
    setAr(resultArray);
  };

  const doLocation = async (city, street, homeNumber) => {
    let url = `https://nominatim.openstreetmap.org/search?street=${street} ${homeNumber}&city=${city}&country=israel&format=json`;
    let resp = await axios.get(url);
    if (resp.data.length > 0)
      return [parseFloat(resp.data[0].lon), parseFloat(resp.data[0].lat)];
    else return ["", ""];
  };
  const connectUser = async (id) => {
    let flag = true;
    //get user to connect
    let url = API_URL + "/users/single/" + id;
    let resp = await doApiGet(url);
    let userConnect = resp.data;
    userConnect.requests.forEach((element) => {
      if (element.id === user._id) {
        toast.warn("You're already send a connection to this user");
        flag = false;
      }
    });
    userConnect.connections.forEach((element) => {
      if (element.id === user._id) {
        toast.warn("You're already connected to this user");
        flag = false;
      }
    });
    //add connect to this user
    if (!flag) return;
    if (
      user.connections.length > 2 &&
      user.role !== "admin" &&
      user.role !== "premium"
    ) {
      toast.warning("you need to get a premium user to send more connections");
      nav("/checkoutPremium");
      return;
    }
    let obj = {};
    obj.id = user._id;
    obj.date = new Date();
    userConnect.requests.push(obj);
    let url2 = API_URL + "/users/" + id;
    try {
      let resp = await doApiMethod(url2, "PUT", userConnect);
      if (resp.data.modifiedCount) {
        toast.success("Connection sent successfully");
        doApi();
      } else {
        toast.warning("There problem try again later");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
    }
  };
  const getAvg = async (id) => {
    let url = API_URL + "/users/single/" + id;
    let resp = await doApiGet(url);
    let userConnect = resp.data;
    let sumRating = 0;
    userConnect.reviews.forEach((review) => {
      sumRating += review.raiting;
    });
    return parseFloat(sumRating / userConnect.reviews.length);
  };
  const checkIfAlreadyConnect = async (id) => {
    let flag = true;
    let url = API_URL + "/users/single/" + id;
    let resp = await doApiGet(url);
    let userConnect = resp.data;
    userConnect.connections.forEach((element) => {
      if (element.id === user._id) {
        flag = false;
      }
    });
    return flag;
  };
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <AuthClientComp />
      <Message />
      <NavMap setStyle={setStyle} />
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoidXJpYTEzNDYiLCJhIjoiY2w0YmczdDhiMG92eDNsbzdtdGNvd3kxNyJ9.T8AiSpg2KXsfovyZk_Yc6w"
        width="100%"
        height="100%"
        transitionDuration="10"
        mapStyle={style}
        onViewportChange={(viewport) => setViewport(viewport)}
      >
        {ar.map((item, index) => {
          if (item.lon)
            return (
              <Marker key={index} latitude={item.lat} longitude={item.lon}>
                <button
                  className="marker-btn"
                  onClick={async (e) => {
                    e.preventDefault();
                    setSelectedUser(item);
                    const avg = await getAvg(item.userId);
                    setAverageRating(avg);
                    let connectFlag = await checkIfAlreadyConnect(item.userId);
                    setAlreadyConnect(connectFlag);
                  }}
                >
                  <img src={item.img} alt="User Icon" />
                </button>
              </Marker>
            );
          else return "";
        })}
        {selectedUser ? (
          <Popup latitude={selectedUser.lat} longitude={selectedUser.lon}>
            <div className="card-product">
              <div className="card-product">
                <Card
                  sx={{
                    minWidth: 250,
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={selectedUser.img}
                    alt={selectedUser.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                      {selectedUser.name}
                    </Typography>
                    <Typography gutterBottom variant="" component="div">
                      <strong>Address:</strong> {selectedUser.city}{" "}
                      {selectedUser.street} {selectedUser.homeNumber}
                    </Typography>
                    <Typography gutterBottom variant="" component="div">
                      <Rating value={averageRating} precision={1} readOnly />
                    </Typography>
                    <Typography gutterBottom variant="" component="div">
                      <strong>Teaching Subjects:</strong> {selectedUser.subCat}
                      <Typography
                        gutterBottom
                        variant=""
                        component="div"
                        className="mt-2"
                      >
                        <strong>I can offer:</strong>{" "}
                        {selectedUser.canOfferSubCat}
                      </Typography>
                    </Typography>
                    <div className="text-center mt-3">
                      {alreadyConnect ? (
                        <button
                          className="btnDesign"
                          onClick={() => connectUser(selectedUser.userId)}
                        >
                          Connect
                        </button>
                      ) : (
                        <button
                          className="btnDesign"
                          onClick={() => nav("/chat/" + selectedUser.userId)}
                        >
                          Message
                        </button>
                      )}
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="large"
                      onClick={() => setSelectedUser(null)}
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "78%",
                        color: "red",
                      }}
                    >
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default BarterMap;
