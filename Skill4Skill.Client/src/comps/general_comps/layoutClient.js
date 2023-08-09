import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ClientFooter from "./clientFooter";
import ClientHeader from "./clientHeader";
import Cart from "../users_comps/cart";
import { AppContext } from "../../context/shopContext";
import "./../css/client.css";
import "./../css/headerFooter.css";
import { useEffect } from "react";
import { SHOP_TOKEN, checkTokenLocal } from "../../services/localService";

function LayoutClient(props) {
  const [showCart, setShowCart] = useState("none");
  let [login, setLogin] = useState("");
  const [hideFooter, setHideFooter] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLogin(checkTokenLocal());
  },[localStorage[SHOP_TOKEN]]);

  useEffect(() => {
    if (location.pathname.includes("barterMap") || location.pathname.includes("chat")) {
      setHideFooter(true);
    } else {
      setHideFooter(false);
    }
  },[location.pathname]);
  

  return (
    <AppContext.Provider
      value={{
        showCart,
        setShowCart,
      }}
    >
      {login && <Cart />}
      <ClientHeader />
      <Outlet />
      {!hideFooter && <ClientFooter />}
    </AppContext.Provider>
  );
}

export default LayoutClient;
