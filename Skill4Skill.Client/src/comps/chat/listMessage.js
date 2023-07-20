import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { sortBy } from "lodash";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./../css/chat.css";

const socket = socketIOClient(API_URL);
function ListMessage() {
  const params = useParams();
  const [id, setId] = useState(params.id);
  const [arChat, setArChat] = useState([]);
  const [userObj, setUserObj] = useState({});
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    scrollToBottom();
  }, [arChat]);

  useEffect(() => {
    setId(params.id);
  }, [params.id]);

  useEffect(() => {
    socket.on("nodeJsEvent", handleIncomingMessage);
    return () => socket.off("nodeJsEvent", handleIncomingMessage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    doApiUserObj();
    doApi();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    const url = `${API_URL}/chat/userMessage/${id}`;
    try {
      setLoading(true);
      const { data } = await doApiGet(url);
      const orderData = sortBy(data, ["date_created", "_id"]);
      const formattedData = orderData.map((element) => ({
        ...element,
        date_created: `${String(
          new Date(element.date_created).getHours()
        ).padStart(2, "0")}:${String(
          new Date(element.date_created).getMinutes()
        ).padStart(2, "0")}`,
      }));
      setArChat(formattedData);
      setLoading(false);
    } catch (error) {
      alert("Error, please try again later.");
      console.log(error);
    }
  };

  const doApiUserObj = async () => {
    try {
      const url = `${API_URL}/users/allUsers`;
      const { data } = await doApiGet(url);
      const usersObj = data.reduce((obj, item) => {
        obj[item._id] = item.first_name + " " + item.last_name;
        return obj;
      }, {});
      setUserObj(usersObj);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const doAPiNewMessage = async (text) => {
    const url = `${API_URL}/chat/${id}`;
    const body = { Message: text };
    try {
      setLoading(true);
      const { data } = await doApiMethod(url, "POST", body);
      socket.emit("FromAPI", data.message);
      setLoading(false);
    } catch (error) {
      alert("Error, please try again later.");
      console.log(error);
    }
  };

  const handleIncomingMessage = (data) => {
    const formattedData = {
      ...data,
      date_created: `${String(new Date(data.date_created).getHours()).padStart(
        2,
        "0"
      )}:${String(new Date(data.date_created).getMinutes()).padStart(2, "0")}`,
    };
    setArChat((prevArChat) => [...prevArChat, formattedData]);
  };

  const handleOnEnter = (text) => {
    doAPiNewMessage(text);
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const chatContainer = chatContainerRef.current;
      chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }
  };

  useEffect(() => {
    const isFirstTime = localStorage.getItem("isFirstTime");
    if (!isFirstTime) {
      localStorage.setItem("isFirstTime", "true");
    } else {
      scrollToBottom();
    }
  }, []);

  return (
    <div className="">
      <div className="listMessage p-2" style={{ display: "flex" }}>
        <div className="messageitem p-2 my-4 pb-4">
          <button
            onClick={() => {
              setLoading(false);
              nav(-1);
            }}
            className="btnClose"
          >
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </button>
          <p className="text-center gradi p-0 h3">
            <i className="fa fa-lastfm me-2" aria-hidden="true"></i>
            {userObj[id]}
          </p>
          {loading ? (
            <h1>Loading....</h1>
          ) : (
            <div
              ref={chatContainerRef}
              id="scroll"
              className="itemlistMessage overflow-auto pr-5"
            >
              {arChat.map((item, i) => (
                <div key={i}>
                  {id === item.sender_id ? (
                    <div className="float-end messageChat_item mt-3">
                      <span className="fw-bolder">
                        {userObj[item.sender_id].toUpperCase()}
                      </span>
                      <br />
                      <span>{item.Message}</span>
                      <br />
                      <span className="spans">{item.date_created}</span>
                      <br />
                    </div>
                  ) : (
                    <div className="float-start messageChat_item mt-3">
                      <span className="fw-bolder">
                        {userObj[item.sender_id].toUpperCase()}
                      </span>
                      <br />
                      <span>{item.Message}</span>
                      <br />
                      <span className="spans">{item.date_created}</span>
                      <br />
                    </div>
                  )}
                  <br />
                </div>
              ))}
              <br />
            </div>
          )}
          <div className="emoji d-flex">
            <button
              onClick={() => {
                handleOnEnter(text);
                setText("");
              }}
              className="d-md-none btn btn-light my-2"
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
            <InputEmoji
              className=""
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a message"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListMessage;
