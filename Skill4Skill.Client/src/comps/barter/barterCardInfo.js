import { useEffect, useState } from "react";
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

function BarterCardInfo(props) {
  const [catInfo, setCatInfo] = useState({});
  const [user, setUser] = useState([]);
  const [raitingAvg, setRaitingAvg] = useState(0);
  const [catOfferInfo, setCatOfferInfo] = useState([]);
  const [popup, setPopup] = useState();
  const [alreadyConnect, setAlreadyConnect] = useState(false);
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
    if (user.connections.length > 2 && user.role !== "admin" && user.role !== "premium") {
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
    <div className="product-item col-md-4 p-2">
      <div
        className="shadow text-center"
        onClick={async (e) => {
          e.preventDefault();
          setPopup(true);
          let connectFlag = await checkIfAlreadyConnect(item.userId);
          setAlreadyConnect(connectFlag);
        }}
        style={{ cursor: "pointer" }}
      >
        <div
          style={{
            backgroundImage: `url(${item.img})`,
            backgroundPosition: "center calc(13%)",
          }}
          className="product-img"
        ></div>
        <div className="p-2">
          <h4 className="gradi">{item.name}</h4>
          <p className="text-center h4">
            {catInfo.name} - {item.subCat}
          </p>
        </div>
      </div>
      {popup ? (
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
                <Typography gutterBottom variant="" component="div">
                  <strong>Connections:</strong> {user.connections.length}
                </Typography>
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
                <Typography gutterBottom variant="" component="div">
                  {item.des}
                </Typography>
                <div className="text-center mt-3">
                  {alreadyConnect ? (
                    <button
                      className="btnDesign"
                      onClick={() => connectUser(item.userId)}
                    >
                      Connect
                    </button>
                  ) : (
                    <button
                      className="btnDesign"
                      onClick={() => nav("/chat" + item.userId)}
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
        </div>
      ) : null}
    </div>
  );
}

export default BarterCardInfo;
