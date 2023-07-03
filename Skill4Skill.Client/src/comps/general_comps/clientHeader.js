import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkTokenLocal } from "../../services/localService";
import Hamburger from "hamburger-react";
import { AppContext } from "../../context/shopContext";

function ClientHeader(props) {
  let [login, setLogin] = useState("");
  const [isOpen, setOpen] = useState(false);
  let location = useLocation();
  const { showCart, setShowCart } = useContext(AppContext);

  useEffect(() => {
    setLogin(checkTokenLocal());
  },[location]);

  window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });

  return (
    <header className="shadow header-client container-fluid position-fixed ">
      <div className="container">
        <nav className=" navbar navbar-expand-md navbar-light ">
          <Link onClick={() => setOpen(false)} to="/">
            <img src="/images/logo-no-background.png" height={"25vh"} alt="logo-no-background"/>
          </Link>
          <button
            style={{ borderRadius: "24px 8px", color: "#00BFFF" }}
            className="navbar-toggler btn"
            onClick={() => setOpen(!isOpen)}
          >
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </button>
          <div
            className={`align-items-center collapse navbar-collapse justify-content-around ${
              isOpen ? "show" : ""
            }`}
            id="navbarMenu"
          >
            <div className="links_header">
              <Link onClick={() => setOpen(false)} to="/">
                <i
                  className="fa fa-home me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Home
              </Link>
              <Link onClick={() => setOpen(false)} to="/groupCat">
                <i
                  className="fa fa-users me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Categories
              </Link>
              <Link onClick={() => setOpen(false)} to="/barter">
                <i
                  className="fa fa-american-sign-language-interpreting me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Barter
              </Link>
              <Link onClick={() => setOpen(false)} to="/barterMap">
                <i
                  className="fa fa-map me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Map
              </Link>
              <Link onClick={() => setOpen(false)} to="contact">
                <i
                  className="fa fa-phone me-2 d-block text-center"
                  aria-hidden="true"
                ></i>
                Contact
              </Link>
            </div>
            <div className="log_in_out me-5 links_header">
              {login ? (
                <React.Fragment>
                  {" "}
                  <Link
                    to="/userInfo"
                    onClick={() => setOpen(false)}
                  >
                    <i
                      className="fa fa-pencil me-2 d-block text-center"
                      aria-hidden="true"
                    ></i>
                    My User
                  </Link>
                  <Link
                   to={location.pathname}
                    onClick={() => {
                      setOpen(false);
                      showCart === "none"
                        ? setShowCart("block")
                        : setShowCart("none");
                    }}
                  >
                    <i
                      className="fa fa-users d-block text-center"
                      aria-hidden="true"
                    ></i>
                    Network
                  </Link>
                  <Link
                    to="/logout"
                    onClick={() => setOpen(false)}
                  >
                    <i
                      className="mx-2 fa fa-sign-out me-2 d-block text-center"
                      aria-hidden="true"
                    ></i>
                    Sign out
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fa fa-sign-in mx-2" aria-hidden="true"></i>Log
                    in
                  </Link>
                  <span className="slesh text-white">/</span>
                  <Link
                    to="/signup"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fa fa-plus mx-2" aria-hidden="true"></i>Sign
                    up
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default ClientHeader;
