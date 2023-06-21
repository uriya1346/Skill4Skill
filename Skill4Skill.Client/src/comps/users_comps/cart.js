import React, { useContext, useEffect, useState } from "react";
import "../css/cart.css";
import { AppContext } from "../../context/shopContext";
import { API_URL, doApiGet } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import CartInfo from "./cartinfo";
import MyConnections from "./myConnections";

function Cart(props) {
  let arr = [];
  const { showCart, setShowCart } = useContext(AppContext);
  const [usersRequests, setUsersRequests] = useState([]);
  const [myConnections, setMyConnections] = useState([]);
  const [showConnections, setShowConnections] = useState(true);
  const [loadingflag, setLoadingflag] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  useEffect(() => {
    doApi();
  }, [showCart]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    let resp = await doApiGet(url);
    setRequestCount(resp.data.requests.length);
    for (let i = 0; i < resp.data.requests.length; i++) {
      let urlUsers = API_URL + "/users/single/" + resp.data.requests[i].id;
      let resp2 = await doApiGet(urlUsers);
      arr.push(resp2.data);
    }
    setUsersRequests(arr);
    let url2 = API_URL + "/users/myConnections";
    let resp2 = await doApiGet(url2);
    setMyConnections(resp2.data);
    setLoadingflag(true);
  };

  return (
      <div
        style={{ display: showCart }}
        className="cart gradient-background pb-3"
      >
        <button
          className="btn close-btn"
          onClick={() => {
            setShowCart("none");
          }}
        >
          <i
            className="fa fa-times-circle"
            style={{ fontSize: "22px" }}
            aria-hidden="true"
          ></i>
        </button>
        <div className="cart-tabs d-flex justify-content-center">
          <div
            className={`cart-tab ${!showConnections ? "cart-tab-active" : ""}`}
            id="my-requests-tab"
            onClick={() => setShowConnections(false)}
          >
            My Requests
            {requestCount > 0 && (
              <span className="request-count">{requestCount}</span>
            )}
          </div>
          <div
            className={`cart-tab ${!showConnections ? "" : "cart-tab-active"}`}
            id="my-connections-tab"
            onClick={() => setShowConnections(true)}
          >
            My Connections
          </div>
        </div>
        {!showConnections ? (
          <div className="container py-1 categories_list">
            <h6 className="text-center text-uppercase">
              <i className="fa fa-lastfm me-1 mb-4" aria-hidden="true"></i>
              Requests
            </h6>

            {usersRequests.length === 0 && !loadingflag ? (
              <div className="text-center mt-4">
                {" "}
                <BeatLoader />{" "}
              </div>
            ) : (
              <div className="row">
                {usersRequests.map((item) => {
                  return <CartInfo key={item._id} item={item} />;
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="row py-1">
            <h6 className="text-center text-uppercase">
              <i className="fa fa-lastfm me-1 mb-4" aria-hidden="true"></i>
              Connections
            </h6>
            {myConnections.map((item) => {
              return <MyConnections key={item.id} item={item} />;
            })}
          </div>
        )}
      </div>
  );
}

export default Cart;
