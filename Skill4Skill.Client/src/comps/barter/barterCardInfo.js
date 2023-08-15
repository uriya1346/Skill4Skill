import { useContext, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import "../css/productDesign.css";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { PopupContext } from '../../context/shopContext';


function BarterCardInfo(props) {
  const [catInfo, setCatInfo] = useState({});
  const [user, setUser] = useState([]);
  const [raitingAvg, setRaitingAvg] = useState(0);
  const [catOfferInfo, setCatOfferInfo] = useState([]);
  const [popup, setPopup] = useState();
  const [alreadyConnect, setAlreadyConnect] = useState(false);
  const { activePopup, setActivePopup } = useContext(PopupContext);
  const nav = useNavigate();
  let item = props.item;

  useEffect(() => {
    doApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => { 
    let obj = {};
    if (item.catNum.includes(",")) {
      const arrStr = item.catNum.split(",");
      let categoryList = "";
      for (let i = 0; i < arrStr.length; i++) {
        let url2 = API_URL + "/categoriesGroup/singleNumber/" + arrStr[i];
        let resp2 = await doApiGet(url2);
        if (i > 0) categoryList += ", " + resp2.data.name;
        else categoryList += resp2.data.name;
        obj.img_url = resp2.data.img_url;
      }
      obj.name = categoryList;
      setCatInfo(obj);
    } else {
      let url2 = API_URL + "/categoriesGroup/singleNumber/" + item.catNum;
      let resp2 = await doApiGet(url2);
      obj.name = resp2.data.name;
      obj.img_url = resp2.data.img_url;
      setCatInfo(obj);
    }

    obj = {};
    if (item.canOfferCat.includes(",")) {
      const arrStr = item.canOfferCat.split(",");
      let categoryList = "";
      for (let i = 0; i < arrStr.length; i++) {
        let url2 = API_URL + "/categoriesGroup/singleNumber/" + arrStr[i];
        let resp2 = await doApiGet(url2);
        if (i > 0) categoryList += ", " + resp2.data.name;
        else categoryList += resp2.data.name;
        obj.img_url = resp2.data.img_url;
      }
      obj.name = categoryList;
      setCatOfferInfo(obj);
    } else {
      let url2 = API_URL + "/categoriesGroup/singleNumber/" + item.canOfferCat;
      let resp2 = await doApiGet(url2);
      obj.name = resp2.data.name;
      obj.img_url = resp2.data.img_url;
      setCatOfferInfo(obj);
    }
    let url3 = API_URL + "/users/myInfo";
    let resp3 = await doApiGet(url3);
    setUser(resp3.data);
    getAvg(item.userId);
  };

  const connectUser = async (id) => {
    let flag = true;
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
    setRaitingAvg(sumRating / userConnect.reviews.length);
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
    <div className="product-item col-md-3 p-3" style={{borderRadius:"30px"}}>
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
          let connectFlag = await checkIfAlreadyConnect(item.userId);
          setAlreadyConnect(connectFlag);
          setActivePopup(props.index); 
        }}
      >
        <div
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
            borderRadius:"20px"
          }}
          className="product-img"
        ></div>
        <div className="card-body">
          <h4 className="fire-color">{item.name}</h4>
          <p className="card-text text-center">
            {catInfo.name} - {item.subCat}
          </p>
        </div>
      </motion.div>
      {activePopup === props.index ? (
        <motion.div
          className="card-product"
          animate={{ y: [0, 50, 35]}}
          transition={{ duration: 0.4 }}
        >
          <Card
            sx={{
              minWidth: 250,
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={item.img}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography gutterBottom variant="" component="div">
                <Rating value={raitingAvg} precision={1} readOnly />
              </Typography>
              {/* <Typography gutterBottom variant="" component="div">
                <strong>Connections:</strong> {user.connections.length}
              </Typography> */}
              <Typography gutterBottom variant="" component="div">
                <strong>Teaching Categories:</strong> {catInfo.name}
              </Typography>
              <Typography gutterBottom variant="" component="div">
                <strong>Teaching Subjects:</strong> {item.subCat}
                <Typography
                  gutterBottom
                  variant=""
                  component="div"
                  className="mt-2"
                >
                  I can offer: <br />
                  <strong>Offering Categories:</strong> {catOfferInfo.name}
                  <br />
                  <strong>Offering Subjects:</strong> {item.canOfferSubCat}
                </Typography>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.des}
              </Typography>
              <div className="text-center mt-3">
                {alreadyConnect ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => connectUser(item.userId)}
                  >
                    Connect
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => nav("/chat/" + item.userId)}
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

export default BarterCardInfo;
