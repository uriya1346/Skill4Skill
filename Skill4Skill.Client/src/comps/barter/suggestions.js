import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../css/productDesign.css";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

function Suggestions(props) {
  const [user, setUser] = useState({});
  const [myUser, setMyUser] = useState({});
  const [popup, setPopup] = useState();
  const [raitingAvg, setRaitingAvg] = useState(0);
  const [alreadyConnect, setAlreadyConnect] = useState(false);
  const nav = useNavigate();
  let item = props.item;

  useEffect(() => {
    doApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/users/single/" + item.id;
    let resp = await doApiGet(url);
    resp.data.match = item.match
    resp.data.match = item.match
    resp.data.reason = item.reason
    let sumRating = 0;
    resp.data.reviews.forEach((review) => {
      sumRating += review.raiting;
    });
    setRaitingAvg(sumRating / resp.data.reviews.length);
    setUser(resp.data)
    let url2 = API_URL + "/users/myInfo";
    let resp2 = await doApiGet(url2);
    setMyUser(resp2.data)
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
  const checkIfAlreadyConnect = async (id) => {
    let flag = true;
    myUser.connections.forEach((element) => {
      if (element.id === id) {
        flag = false;
      }
    });
    return flag;
  };
  if (!user) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="product-item col-md-4 p-2">
        <div
          className="shadow text-center"
          onClick={async (e) => {
            e.preventDefault();
            setPopup(true);
            let connectFlag = await checkIfAlreadyConnect(user._id);
            setAlreadyConnect(connectFlag);
          }}
          style={{ cursor: "pointer" }}
        >
          <div
            style={{
              backgroundImage: `url(${user.img_url})`,
              backgroundPosition: "center calc(13%)",
            }}
            className="product-img"
          ></div>
          <div className="p-2">
            <h4 className="gradi">
              {user.first_name} {user.last_name}
            </h4>
            <p className="text-center h4">
              match: {user.match}
            </p>
          </div>
        </div>
        {popup ? (
          <div className="card-product" style={{ zIndex: "99" }}>
            <Card
              sx={{
                minWidth: 250,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={user.img_url}
                alt={user.first_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography gutterBottom variant="" component="div">
                  <Rating value={raitingAvg} precision={1} readOnly />
                </Typography>
                <Typography gutterBottom variant="" component="div">
                  <strong>Match: </strong>
                  {user.match}
                </Typography>
                <Typography gutterBottom variant="" component="div">
                  <strong>Reason: </strong>
                  {user.reason}
                </Typography>
                <div className="text-center mt-3">
                  {alreadyConnect ? (
                    <button
                      className="btnDesign"
                      onClick={() => connectUser(user._id)}
                    >
                      Connect
                    </button>
                  ) : (
                    <button
                      className="btnDesign"
                      onClick={() => nav("/chat" + user._id)}
                    >
                      Message
                    </button>
                  )}
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  onClick={() => setPopup(false)}
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
        ) : null}
      </div>
    );
}

export default Suggestions;
