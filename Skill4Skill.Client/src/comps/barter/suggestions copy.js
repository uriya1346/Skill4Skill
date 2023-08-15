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
import { motion } from "framer-motion";
import { PopupContext } from '../../context/shopContext';
import { useContext } from "react";

function Suggestions(props) {
  const [user, setUser] = useState({});
  const [myUser, setMyUser] = useState({});
  const [raitingAvg, setRaitingAvg] = useState(0);
  const [alreadyConnect, setAlreadyConnect] = useState(false);
  const { activePopup, setActivePopup } = useContext(PopupContext);
  const nav = useNavigate();
  let item = props.item;

  useEffect(() => {
    doApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/users/single/" + item.id;
    let resp = await doApiGet(url);
    resp.data.match = item.match;
    resp.data.reason = item.reason;
    let sumRating = 0;
    resp.data.reviews.forEach((review) => {
      sumRating += review.raiting;
    });
    setRaitingAvg(sumRating / resp.data.reviews.length);
    setUser(resp.data);
    let url2 = API_URL + "/users/myInfo";
    let resp2 = await doApiGet(url2);
    setMyUser(resp2.data);
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
      <div className="product-item col-md-4 p-3">
        <motion.div
          className="card shadow text-center h-100"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          style={{
            cursor: "pointer",
            perspective: "1500px",
          backgroundColor: "#FDF5E6",
          borderRadius:"20px"
          }}
          onClick={async (e) => {
            e.preventDefault();
            let connectFlag = await checkIfAlreadyConnect(user._id);
            setAlreadyConnect(connectFlag);
            setActivePopup(props.index); 
          }}
        >
          <div
            style={{
              backgroundImage: `url(${user.img_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "200px",
              borderRadius:"20px"
            }}
            className="product-img"
          ></div>
          <div className="card-body">
            <h4 className="fire-color">
              {user.first_name} {user.last_name}
            </h4>
            <p className="card-text text-center">Match: {user.match}</p>
          </div>
        </motion.div>
        {activePopup === props.index ? (
          <motion.div
            className="card-product"
            animate={{ x: [0, 100, 0] }}
          >
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
                <Typography variant="body2" component="div">
                  <Rating value={raitingAvg} precision={1} readOnly />
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>Match: </strong>
                  {user.match}
                </Typography>
                <Typography variant="body2" component="div">
                  <strong>Reason: </strong>
                  {user.reason}
                </Typography>
                <div className="text-center mt-3">
                  {alreadyConnect ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => connectUser(user._id)}
                    >
                      Connect
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => nav("/chat/" + user._id)}
                    >
                      Message
                    </button>
                  )}
                </div>
              </CardContent>
              <CardActions>
                <Button
                  size="large"
                  onClick={() => setActivePopup(null)}
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
          </motion.div>
        ) : null}
      </div>
    );
}

export default Suggestions;
