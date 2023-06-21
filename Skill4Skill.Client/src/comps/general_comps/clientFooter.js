import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

function ClientFooter(props) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Your email has been successfully submitted. We will be in touch!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address.");
    }
  };
  
  return (
    <footer className="footer-client" style={{ backgroundColor: "#333", color: "#fff", padding: "20px 0" }}>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-12">
          <h4 className="text-uppercase mb-4" style={{ color: "#f2f2f2" }}>
            Connect with us
          </h4>
          <ul className="list-unstyled">
            <li>
              <i className="fa fa-facebook me-1" style={{ color: "#3b5998" }}></i>
              <a
                href="#"
                style={{ color: "#f2f2f2" }}
                onMouseOver={(e) => (e.target.style.color = "#3b5998")}
                onMouseOut={(e) => (e.target.style.color = "#f2f2f2")}
              >
                Facebook
              </a>
            </li>
            <li>
              <i className="fa fa-twitter me-1" style={{ color: "#1da1f2" }}></i>
              <a
                href="#"
                style={{ color: "#f2f2f2" }}
                onMouseOver={(e) => (e.target.style.color = "#1da1f2")}
                onMouseOut={(e) => (e.target.style.color = "#f2f2f2")}
              >
                Twitter
              </a>
            </li>
            <li>
              <i className="fa fa-instagram me-1" style={{ color: "#c32aa3" }}></i>
              <a
                href="#"
                style={{ color: "#f2f2f2" }}
                onMouseOver={(e) => (e.target.style.color = "#c32aa3")}
                onMouseOut={(e) => (e.target.style.color = "#f2f2f2")}
              >
                Instagram
              </a>
            </li>
            <li>
              <i className="fa fa-linkedin me-1" style={{ color: "#0077b5" }}></i>
              <a
                href="#"
                style={{ color: "#f2f2f2" }}
                onMouseOver={(e) => (e.target.style.color = "#0077b5")}
                onMouseOut={(e) => (e.target.style.color = "#f2f2f2")}
              >
                LinkedIn
              </a>
            </li>
            <li>
              <i className="fa fa-youtube me-1" style={{ color: "#ff0000" }}></i>
              <a
                href="#"
                style={{ color: "#f2f2f2" }}
                onMouseOver={(e) => (e.target.style.color = "#ff0000")}
                onMouseOut={(e) => (e.target.style.color = "#f2f2f2")}
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-12">
          <h4 className="text-uppercase mb-4" style={{ color: "#f2f2f2" }}>
            About us
          </h4>
          <ul className="list-unstyled">
            <li>
              <a href="/#welcomeHeader" style={{ color: "#f2f2f2" }}>
                Our mission
              </a>
            </li>
            <li>
              <a href="/aboutUs" style={{ color: "#f2f2f2" }}>
                Our team
              </a>
            </li>
            <li>
              <a href="/contact" style={{ color: "#f2f2f2" }}>
                Contact us
              </a>
            </li>
            <li>
              <a href="/careers" style={{ color: "#f2f2f2" }}>
                Careers
              </a>
            </li>
            <li>
              <a href="/faq" style={{ color: "#f2f2f2" }}>
                FAQs
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-12">
          <h4 className="text-uppercase mb-4" style={{ color: "#f2f2f2" }}>
            Stay in the loop
          </h4>
          <p className="mb-4">
            Subscribe to our newsletter and be the first to know about new products, upcoming events, and exclusive offers.
          </p>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginBottom: "10px", padding: "5px 10px", width: "80%", color:"white" }}
              />
              <button
                type="submit"
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#1da1f2",
                  border: "none",
                  color: "#fff",
                  borderRadius: "5px"
                }}
              >
                Subscribe
              </button>
            </form>
          <p className="mt-3" style={{ fontSize: "12px", color: "#ccc" }}>
            By subscribing, you agree to receive marketing emails from us. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default ClientFooter;