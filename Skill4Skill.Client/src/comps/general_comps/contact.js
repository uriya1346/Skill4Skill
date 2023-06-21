import React, { useRef } from "react";
import "../css/contact.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Contact(props) {
  const form = useRef();
  const nav = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cars",
        "template_zpjnfud",
        form.current,
        "kyexmZY3HTBCh4cHd"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    toast.success("Thank you, We will get back to you soon");
    nav("/");
  };

  return (
    <div className="contact-page">
      <div style={{minHeight: "5vh"}}></div>
      <section className="contact">
        <div className="content">
          <h3>
            <i className="me-2 fa fa-compress" aria-hidden="true"></i>CONTACT US
            <i className="ms-2 fa fa-compress" aria-hidden="true"></i>
          </h3>
          <p className="mt-4 text-center">
            Thank you for visiting Skill4Skill! We are excited to hear from you
            and answer any questions you may have. Please don't hesitate to
            reach out to us by filling out the contact form below. Leave your
            name, email, and a brief message and we'll get back to you as soon
            as possible. We look forward to hearing from you and helping you
            achieve your lifelong learning goals!
          </p>
        </div>
        <div className="containerd">
          <div className="contactInfo">
            <div className="box">
              <div className="icon">
                <i className="fa fa-map-marker" aria-hidden="true"></i>
              </div>
              <div className="text">
                <h3>Address</h3>
                <p className="text-center">
                  7367 Sugar Camp Road,
                  <br />
                  Owatonna, Minnesota,
                  <br />
                  5060
                </p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fa fa-phone" aria-hidden="true"></i>
              </div>
              <div className="text">
                <h3>Phone</h3>
                <p>+972-53-301-6070</p>
              </div>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fa fa-envelope-o" aria-hidden="true"></i>
              </div>
              <div className="text">
                <h3>Email</h3>
                <p>Uria1346@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="contactForm">
            <form ref={form} onSubmit={sendEmail}>
              <h2 className="text-center">Send Message</h2>
              <br/>
              <div className="inputBox">
                <input type="text" name="name" required />
                <span>Full Name</span>
              </div>

              <div className="inputBox">
                <input name="email" type="email" required />
                <span>Email</span>
              </div>

              <div className="inputBox">
                <textarea required name="message"></textarea>
                <span>Type your message...</span>
              </div>
              <div className="inputBox">
                <button className="btn">Send</button>
              </div>
            </form>
          </div>
        </div>
        <div style={{minHeight: "6vh"}}></div>
      </section>
    </div>
  );
}

export default Contact;
