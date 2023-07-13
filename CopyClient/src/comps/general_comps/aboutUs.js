import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../css/aboutUs.css";
import { useNavigate } from "react-router-dom";

function AboutUs(props) {
  const nav = useNavigate();
  const handleSocialLinkClick = (e) => {
    e.preventDefault();
    // Add your custom social link functionality here
  };

  return (
    <div className="container">
      <div style={{ minHeight: "17vh" }}></div>
      <div className="container-about-us p-4 shadow">
        <h1 className="text-center gradi">About Us</h1>
        <Row className="p-4">
          <Col>
            <p>
              Welcome to Skill4Skill, the premier platform designed to foster
              knowledge exchange and skill development. Our mission is to
              empower individuals by creating an inclusive space where they can
              expand their expertise through learning from others while sharing
              their own passions and insights. Whether you have a burning desire
              to learn a new language, explore a fascinating hobby, or acquire
              valuable professional skills, Skill4Skill is your gateway to
              unlocking endless possibilities.
            </p>
          </Col>
        </Row>
        <Row className="p-4">
          <Col>
            <p>
              At Skill4Skill, our community thrives on diversity and the
              collective pursuit of personal and professional growth. We bring
              together a vibrant group of individuals from all walks of life who
              are passionate about sharing their knowledge and eager to learn
              from others. By joining our platform, you'll gain access to a wide
              range of topics and connect with like-minded individuals who share
              your enthusiasm for lifelong learning. Engage in meaningful
              discussions, schedule sessions tailored to your availability, and
              embark on a transformative journey towards achieving your goals.
            </p>
          </Col>
        </Row>
        <Row className="p-4">
          <Col>
            <p>
              Join Skill4Skill today and embark on an enriching learning
              experience. Explore the depths of human expertise, connect with
              passionate learners and teachers, and broaden your horizons like
              never before. Together, let's embrace the power of knowledge
              exchange and shape a community where everyone can thrive and
              contribute to each other's success. Skill4Skill is your
              springboard to personal growth and the realization of your
              aspirations. Get ready to unlock your true potential and embark on
              a remarkable journey of self-improvement.
            </p>
          </Col>
        </Row>
        <Col xs={12} sm={6} md={4} lg={3}>
          <Button
            className="btn btn-primary btn-lg btn-block"
            onClick={() => {
              nav("/barter");
            }}
          >
            Start Learning
          </Button>
        </Col>
        <Row className="mt-5">
          <Col className="text-center">
            <h2 className="section-title">Our Community</h2>
            <p className="section-description">
              Join our diverse community of passionate learners and teachers who
              are dedicated to sharing knowledge and fostering growth.
            </p>
          </Col>
          <Col className="text-center">
            <h2 className="section-title">Endless Possibilities</h2>
            <p className="section-description">
              Explore a wide range of topics, skills, and interests to unlock
              endless possibilities for personal and professional development.
            </p>
          </Col>
          <Col className="text-center">
            <h2 className="section-title">Inspiring Learning Environment</h2>
            <p className="section-description">
              Immerse yourself in an inspiring learning environment where
              curiosity is encouraged, and growth is celebrated.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={2}>
            <Button
              className="btn btn-facebook"
              onClick={handleSocialLinkClick}
            >
              Facebook
            </Button>
          </Col>
          <Col xs={2}>
            <Button className="btn btn-twitter" onClick={handleSocialLinkClick}>
              Twitter
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              className="btn btn-instagram"
              onClick={handleSocialLinkClick}
            >
              Instagram
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              className="btn btn-linkedin"
              onClick={handleSocialLinkClick}
            >
              LinkedIn
            </Button>
          </Col>
        </Row>
      </div>
      <div style={{ minHeight: "17vh" }}></div>
    </div>
  );
}

export default AboutUs;
