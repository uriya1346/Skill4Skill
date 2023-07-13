import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteToken } from "../../services/localService";
import { AppContext } from "../../context/shopContext";

function LogoutClient(props) {
  let nav = useNavigate();
  const { setShowCart } = useContext(AppContext);

  useEffect(() => {
    setShowCart("none");
    deleteToken();
    toast.info("You logged out from system , see you soon!");
    nav("/");
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return <React.Fragment></React.Fragment>;
}

export default LogoutClient;
