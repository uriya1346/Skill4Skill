import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import AuthClientComp from "../users_comps/authClientComp";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import "../css/testSkill.css";

function TestSkill(props) {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState({});
  const [catName, setCatName] = useState({});
  const nav = useNavigate();
  const [timeLeft, setTimeLeft] = useState(13); // time for each question
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    doApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (timeLeft > 0 && flag) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, flag]);

  const doApi = async () => {
    try {
      const parts = params.data.split("*");
      const inputSubCat = parts[0];
      const catNumber = parts[1];
      const levelParam = parts[2];
      setSubjectName(inputSubCat);
      let urlCat = API_URL + "/categoriesGroup/singleNumber/" + catNumber;
      let resp = await doApiGet(urlCat);
      let categoryName = resp.data.name;
      setCatName(categoryName);
      let questionsNum = +levelParam;
      let url = API_URL + "/openai/chat";
      let body = {
        message: `build me ${questionsNum} questions at a difficulty level ${questionsNum} out of 10 about ${catName} - ${inputSubCat}, you can also ask questions with code and ask what the output will be. every questions get 3 options answer that just 1 answer its true i want this in json. json example: {"questions": [
            {
              "question": "question",
              "options": [
                "1:bla1",
                "2:bla2",
                "3:bla3"
              ],
              "answer": "bla2"
            }]}`,
      };
      const { data } = await doApiMethod(url, "POST", body);
      setQuestions(data);
      let url2 = API_URL + "/users/myInfo";
      let resp2 = await doApiGet(url2);
      setUser(resp2.data);
      setFlag(true);
    } catch (error) {
      alert("Error, please try again later.");
      console.log(error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(13);
    } else {
      let correctAnswersCount = 0;
      for (let i = 0; i < questions.questions.length; i++) {
        if (questions.questions[i].answer === answers[i]) {
          correctAnswersCount++;
        }
      }
      onSubForm(correctAnswersCount);
    }
  };

  const handleOptionChange = (e) => {
    let newAnswers = [...answers];
    newAnswers[currentQuestion] = e.target.value;
    setAnswers(newAnswers);
  };

  const onSubForm = async (correctCount) => {
    let correctAnswers = questions.questions.length;
    if (correctCount < correctAnswers / 2) {
      toast.dark(
        `you got ${correctCount} out of ${correctAnswers} questions correct. Try again later`
      );
      nav(-1);
      return;
    } else {
      toast.success(
        `you got ${correctCount} out of ${correctAnswers} questions correct.`
      );
      const parts = params.data.split("*");
      const inputSubCat = parts[0];
      const catNumber = parts[1];
      const level = parts[2];
      const idCheck = parts[3];
      let obj = {};
      obj["catNum"] = catNumber;
      obj["subCat"] = inputSubCat;
      obj["level"] = level;
      let tempUser = { ...user };
      if (idCheck) {
        let index = tempUser.knowledge.findIndex((item) => item.id == idCheck);
        obj["id"] = idCheck;
        tempUser.knowledge[index] = obj;
      } else {
        obj["id"] = Math.floor(Math.random() * 9999999);
        tempUser.knowledge.push(obj);
      }
      let url = API_URL + "/users/" + user._id;
      try {
        let resp = await doApiMethod(url, "PUT", tempUser);
        if (resp.data.modifiedCount) {
          if (idCheck) toast.success("Skill updated successfully!");
          else toast.success("The skill was added!");
          nav(-1);
        } else {
          toast.warning("you not change nothing");
        }
      } catch (err) {
        console.log(err.response);
        alert("There problem try again later");
      }
    }
  };
  if (!flag) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h4>We create the test for you.</h4>
        <h2>
          <BeatLoader />
        </h2>
      </div>
    );
  } else
    return (
      <div>
        <div className="frame" key={currentQuestion}>
          <AuthClientComp />
          <div className="overlap-group-wrapper mt-5">
            <div className="overlap-group mt-5">
              <h1 className="h-1">{subjectName} Test</h1>
              <div className="text-wrapper-2">
                {questions.questions[currentQuestion].question}
              </div>
              <div className="text-wrapper-3">Possible Answers:</div>
              <div className="overlap">
                <input
                  type="radio"
                  id={`option1-${currentQuestion}`}
                  name={`answer-${currentQuestion}`}
                  value={questions.questions[currentQuestion].options[0]}
                  onChange={handleOptionChange}
                />
                <label htmlFor={`option1-${currentQuestion}`}>
                  {questions.questions[currentQuestion].options[0]}
                </label>
              </div>
              <div className="div-wrapper">
                <input
                  type="radio"
                  id={`option2-${currentQuestion}`}
                  name={`answer-${currentQuestion}`}
                  value={questions.questions[currentQuestion].options[1]}
                  onChange={handleOptionChange}
                />
                <label htmlFor={`option2-${currentQuestion}`}>
                  {questions.questions[currentQuestion].options[1]}
                </label>
              </div>
              <div className="div">
                <input
                  type="radio"
                  id={`option3-${currentQuestion}`}
                  name={`answer-${currentQuestion}`}
                  value={questions.questions[currentQuestion].options[2]}
                  onChange={handleOptionChange}
                />
                <label htmlFor={`option3-${currentQuestion}`}>
                  {questions.questions[currentQuestion].options[2]}
                </label>
              </div>
              <button className="btn" onClick={handleNextQuestion}>
                Next
              </button>
              <div className="timer">
                <div className="text-wrapper-4">Time Left:</div>
                <div className="text-wrapper-5">{timeLeft}</div>
                <div className="text-wrapper-6">seconds</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TestSkill;
