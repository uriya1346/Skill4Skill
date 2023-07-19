import { Link } from "react-router-dom";
import "../css/homeMain.css";
import { motion } from "framer-motion";

function HomeMain(props) {
  const boxVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const delay = 0.15;
  return (
    <motion.div
      className="container-fluid shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <section className="info container">
        <motion.h1
          id="welcomeHeader"
          animate={{ scale: [1, 1.1, 1], x: [0, 0, 0] }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            loop: Infinity,
          }}
        >
          WELCOME <i className="fa fa-ravelry" aria-hidden="true"></i>
        </motion.h1>
        <p className="text-center">
          At Skill4Skill, we believe that learning is a lifelong journey that
          should be accessible to everyone. By creating a platform where
          individuals can share their knowledge and skills with one another,
          we're breaking down barriers and empowering individuals to reach their
          full potential. Join our community today and start learning and
          growing with Skill4Skill.
        </p>

        <div className="rowbox">
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: delay  }}
            className="info-col"
          >
            <h3>
              Skill4Skill: Learn and Grow Together
              <i className="fa fa-gg ms-2" aria-hidden="true"></i>
            </h3>
            <p className="text-center">
              Welcome to Skill4Skill, the platform that allows you to expand
              your knowledge and skills by learning from others in exchange for
              sharing your own expertise. Whether you're interested in learning
              a new language, discovering a new hobby, or gaining professional
              skills, Skill4Skill has something for everyone. By connecting with
              other learners and teachers, you can gain valuable insights and
              knowledge that will help you achieve your personal and
              professional goals.
            </p>
          </motion.div>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: delay * 2 }}
            className="info-col"
          >
            <h3>
              Join Our Community of Lifelong Learners
              <i className="fa fa-gg ms-2" aria-hidden="true"></i>
            </h3>
            <p className="text-center">
              Our community is made up of individuals from all walks of life who
              are passionate about sharing their knowledge and learning from
              others. By registering with Skill4Skill, you'll have access to a
              diverse range of topics and a community of like-minded individuals
              who are eager to learn and grow. Plus, our platform makes it easy
              to connect with others and schedule sessions that work for you.
            </p>
          </motion.div>
          <motion.div
            variants={boxVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: delay * 3 }}
            className="info-col"
          >
            <h3>
              Unlock Your Potential with Skill4Skill
              <i className="fa fa-gg ms-2" aria-hidden="true"></i>
            </h3>
            <p className="text-center">
              Join us today and start your journey towards lifelong learning.
              Whether you're a seasoned professional or a beginner, Skill4Skill
              is the perfect platform to learn, grow, and connect with others.
              With a user-friendly interface and a commitment to excellence,
              we're confident that you'll love being a part of our community. So
              what are you waiting for? Register now and start learning from
              others while sharing your own skills and expertise with the world!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="country">
        <h1>
          Connecting Learners from Around the World
          <i className="ms-2 fa fa-globe" aria-hidden="true"></i>
        </h1>
        <p className="text-center">
          Skill4Skill is a global community of learners who come from all
          corners of the world to share their knowledge and skills with one
          another. Our platform has connected individuals from different
          cultures, languages, and backgrounds, creating a space for
          cross-cultural learning and exchange. With users spanning across
          multiple continents, we're proud to be a truly global platform that
          brings people together to learn, grow, and connect with one another.
        </p>

        <div className="rowbox">
          <div className="country-col">
            <img src={"/images/country1.jpeg"} alt="london" />
            <div className="layer">
              <h3>PARIS</h3>
            </div>
          </div>
          <div className="country-col">
            <img src={"/images/country2.jpeg"} alt="london" />
            <div className="layer">
              <h3>NEW YORK</h3>
            </div>
          </div>
          <div className="country-col">
            <img src={"/images/country3.jpeg"} alt="london" />
            <div className="layer">
              <h3>DUBAI</h3>
            </div>
          </div>
        </div>
      </section>

      <div className="container mt-4 categories_list">
        <h2 className="text-center gradi text-uppercase">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Our
          Categories
        </h2>
        <div className="row">
          {/* <Link to={"/groupCat"} className="myCard col-md-6 p-3">
            <div className="shadow bg-dark gradi">
              <div
                style={{ backgroundImage: `url("/images/learningGroup.jpg")` }}
                className="img_card"
              ></div>
              <h3 className="text-center p-3">Learning Group</h3>
            </div>
          </Link> */}
          <Link to={"/barter"} className="myCard col-md-6 p-3">
            <div className="shadow link-card gradi">
              <div
                style={{ backgroundImage: `url("/images/cooperative.webp")` }}
                className="img_card"
              ></div>
              <h3 className="text-center p-3">Skill Barter</h3>
            </div>
          </Link>
          <Link to={"/barterMap"} className="myCard col-md-6 p-3">
            <div className="shadow link-card gradi">
              <div
                style={{ backgroundImage: `url("/images/barterMap.jpg")` }}
                className="img_card"
              ></div>
              <h3 className="text-center p-3">Barter Map</h3>
            </div>
          </Link>
          <Link to={"/aboutUs"} className="myCard col-md-6 p-3">
            <div className="shadow link-card gradi">
              <div
                style={{ backgroundImage: `url("/images/aboutUs.jpg")` }}
                className="img_card"
              ></div>
              <h3 className="text-center p-3">About Us</h3>
            </div>
          </Link>
          <Link to={"/contact"} className="myCard col-md-6 p-3">
            <div className="shadow link-card gradi">
              <div
                style={{ backgroundImage: `url("/images/contact.webp")` }}
                className="img_card"
              ></div>
              <h3 className="text-center p-3">Contact Us</h3>
            </div>
          </Link>
        </div>
      </div>
      <section className="testimonials">
        <h1 id="reviews">
          What Our Customers Says
          <i className="ms-2 fa fa-comments" aria-hidden="true"></i>
        </h1>
        <p className="text-center">
          What Our lovely Customers Says About THE LOVE OF Skill4Skill
        </p>

        <div className="rowbox" data-aos="fade-right" data-aos-duration="1500">
          <div className="testimonials-col">
            <img src={"/images/businessMan2f.jpg"} alt="business Man" />
            <div className="div">
              <p>
                Skill4Skill changed my life. I was able to connect with people
                from all over the world and learn skills that I never would have
                been able to otherwise. Through the platform, I've discovered
                new hobbies, improved my language skills, and even gained
                professional expertise that has helped me in my career. I'm so
                grateful for the opportunity to be a part of such an amazing
                community.
              </p>
              <h3>joni red</h3>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-o"></i>
            </div>
          </div>
          <div className="testimonials-col">
            <img src={"/images/businessMan3f.jpg"} alt="business  Woman" />
            <div className="div">
              <p>
                I was hesitant to join Skill4Skill at first, but I'm so glad
                that I did. I've learned so much from other users and have even
                been able to share my own knowledge with others. The platform is
                incredibly user-friendly, and it's easy to find people who share
                similar interests and schedules. I would recommend Skill4Skill
                to anyone who wants to expand their horizons and connect with
                others who are passionate about learning and growing.
              </p>
              <h3>Talya Shitrit</h3>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star-half-o"></i>
            </div>
          </div>
        </div>
      </section>

      <motion.section
        className="cta"
        data-aos="zoom-in"
        data-aos-duration="1500"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <h1>Get in Touch - Let's Learn Together!</h1>
        <Link to="/contact" className="hero-btn">
          CONTACT US <i className="fa fa-sign-in" aria-hidden="true"></i>
        </Link>
      </motion.section>
      <div style={{ minHeight: "3vh" }}></div>
    </motion.div>
  );
}

export default HomeMain;
