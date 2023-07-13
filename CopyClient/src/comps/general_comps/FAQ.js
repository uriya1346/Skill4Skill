import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { motion } from "framer-motion";

function FAQ(props) {
  return (
    <div className="skill4skill-component container p-4">
      <div style={{ minHeight: "13vh" }}></div>
      <motion.h1
      className="text-center mb-5"
        id="welcomeHeader"
        animate={{ scale: [1, 1.1, 1], x: [0, 0, 0] }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          loop: Infinity,
        }}
      >
        Skill4Skill: Learn and Grow Together
        <i className="fa fa-ravelry" aria-hidden="true"></i>
      </motion.h1>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="mb-2">
            Welcome to Skill4Skill
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            Welcome to Skill4Skill, the platform that allows you to expand your
            knowledge and skills by learning from others in exchange for sharing
            your own expertise.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="mb-2">
            Join Our Community of Lifelong Learners
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            Our community is made up of individuals from all walks of life who
            are passionate about sharing their knowledge and learning from
            others.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header className="mb-2">
            Unlock Your Potential with Skill4Skill
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            Join us today and start your journey towards lifelong learning.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header className="mb-2">
            What are the most popular skills shared on the platform?
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            The most popular skills shared on our platform range from languages,
            technology and coding, to music, cooking, and arts and crafts.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header className="mb-2">
            How can I contribute my own skills?
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            You can contribute your own skills by creating an account and
            setting up your profile.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header className="mb-2">
            What if I'm a beginner in the skill I want to learn?
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            Skill4Skill is the perfect place for beginners. Our community is
            supportive and eager to help newcomers.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header className="mb-2">
            Can I learn more than one skill at a time?
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            Yes, you can learn as many skills as you want! Skill4Skill
            encourages multi-disciplinary learning.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header className="mb-2">
            How do I schedule a learning session?
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            You can schedule a learning session by connecting with the person
            you want to learn from through the platform.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header className="mb-2">
            What if I can't find the skill I want to learn?
          </Accordion.Header>
          <Accordion.Body className="mb-4">
            If you can't find the skill you want to learn, you can make a
            request on our platform for it. Chances are, someone else would be
            happy to teach it!
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div style={{ minHeight: "6vh" }}></div>
    </div>
  );
}

export default FAQ;
