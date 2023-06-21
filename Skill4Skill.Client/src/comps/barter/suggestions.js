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
  const [matchBarters, setMatchBarters] = useState([]);
  const [user, setUser] = useState([]);
  const [popup, setPopup] = useState();
  const [catInfo, setCatInfo] = useState([]);
  const [data, setData] = useState(false);
  const [raitingAvg, setRaitingAvg] = useState(0);
  const [alreadyConnect, setAlreadyConnect] = useState(false);
  const nav = useNavigate();
  let item = props.item;

  useEffect(() => {
    doApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    let resp = await doApiGet(url);
    setUser(resp.data);
    const matchingKnowledgeObjects = item.knowledge.filter((knowledgeObject) =>
      resp.data.interested.some(
        (interestedObject) =>
          interestedObject.subCat === knowledgeObject.subCat &&
          interestedObject.catNum === knowledgeObject.catNum
      )
    );
    setMatchBarters(matchingKnowledgeObjects);
    let tempArr = [];
    let encounteredValues = [];
    for (let i = 0; i < matchingKnowledgeObjects.length; i++) {
      if (encounteredValues.includes(matchingKnowledgeObjects[i].catNum)) {
        continue;
      }
      let url2 =
        API_URL +
        "/categoriesGroup/singleNumber/" +
        matchingKnowledgeObjects[i].catNum;
      let resp2 = await doApiGet(url2);
      tempArr.push(resp2.data);
      encounteredValues.push(matchingKnowledgeObjects[i].catNum);
    }
    setCatInfo(tempArr);
    setData(true);
    getAvg(item._id);
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
  if (!data) {
    return <div>Loading...</div>;
  } else
    return (
      <div className="product-item col-md-4 p-2">
        <div
          className="shadow text-center"
          onClick={async (e) => {
            e.preventDefault();
            setPopup(true);
            let connectFlag = await checkIfAlreadyConnect(item._id);
            setAlreadyConnect(connectFlag);
          }}
          style={{ cursor: "pointer" }}
        >
          <div
          style={{
            backgroundImage: `url(${item.img_url})`,
            backgroundPosition: "center calc(13%)",
          }}
            className="product-img"
          ></div>
          <div className="p-2">
            <h4 className="gradi">
              {item.first_name} {item.last_name}
            </h4>
            <p className="text-center h4">
              {catInfo.map((item, index) => {
                return (
                  <span key={index}>
                    {item.name} {index === catInfo.length - 1 ? "" : ","}
                  </span>
                );
              })}
              -{" "}
              {matchBarters.map((item, index) => {
                return (
                  <span key={index}>
                    {item.subCat} {index === matchBarters.length - 1 ? "" : ","}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        {popup ? (
          <div className="card-product" style={{zIndex:"99"}}>
            <Card
              sx={{
                minWidth: 250,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <CardMedia
                component="img"
                height="150"
                image={item.img_url}
                alt={item.first_name}
              />
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {item.first_name} {item.last_name}
                </Typography>
                <Typography gutterBottom variant="" component="div">
                  <Rating value={raitingAvg} precision={1} readOnly />
                </Typography>
                <Typography gutterBottom variant="" component="div">
                  <strong>Categories: </strong>
                  {catInfo.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.name} {index === catInfo.length - 1 ? "" : ","}
                      </span>
                    );
                  })}
                </Typography>
                <Typography gutterBottom variant="" component="div">
                  <strong>Subjects: </strong>
                  {matchBarters.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.subCat}
                        {index === matchBarters.length - 1 ? "" : ","}
                      </span>
                    );
                  })}
                </Typography>
                <Typography gutterBottom variant="" component="div">
                  <strong>{item.first_name} want to learn: </strong>
                  {item.interested.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.subCat}
                        <br />
                      </span>
                    );
                  })}
                </Typography>
                <div className="text-center mt-3">
                  {alreadyConnect ? (
                    <button
                      className="btnDesign"
                      onClick={() => connectUser(item._id)}
                    >
                      Connect
                    </button>
                  ) : (
                    <button
                      className="btnDesign"
                      onClick={() => nav("/chat" + item._id)}
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
