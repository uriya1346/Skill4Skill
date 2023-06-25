import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import AuthClientComp from "../users_comps/authClientComp";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";

function TestSkill(props) {
  const params = useParams();
  const [questions, setQuestions] = useState([]);
  const [subjectName, setSubjectName] = useState("");
  const [flag, setFlag] = useState(false);
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState({});
  const [catName, setCatName] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    doApi();
  });

  const doApi = async () => {
    try {
      const parts = params.data.split("*");
      const inputSubCat = parts[0];
      const catNumber = parts[1];
      const levelParam = parts[2];
      setSubjectName(inputSubCat);
      let urlCat = API_URL + "/categoriesGroup/singleNumber/"+catNumber;
      let resp = await doApiGet(urlCat);
      let categoryName = resp.data.name
      setCatName(categoryName)
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

  const onSubForm = async (data) => {
    const correctAnswers = questions.questions.map((question, index) => {
      const userAnswer = data[Object.keys(data)[index]];
      const correctAnswer = question.answer;
      return userAnswer === correctAnswer;
    });

    const correctCount = correctAnswers.filter(Boolean).length; // Count the number of correct answers
    if (correctCount < correctAnswers.length / 2) {
      toast.dark(
        `you got ${correctCount} out of ${correctAnswers.length} questions correct. Try again later`
      );
      nav(-1);
    } else {
      toast.success(
        `you got ${correctCount} out of ${correctAnswers.length} questions correct.`
      );
      const parts = params.data.split("*");
      const inputSubCat = parts[0];
      const catNumber = parts[1];
      const level = parts[2];
      let obj = {};
      obj["catNum"] = catNumber;
      obj["subCat"] = inputSubCat;
      obj["level"] = level;
      obj["id"] = Math.floor(Math.random() * 9999999);
      let tempUser = { ...user };
      tempUser.knowledge.push(obj);
      let url = API_URL + "/users/" + user._id;
      try {
        let resp = await doApiMethod(url, "PUT", tempUser);
        if (resp.data.modifiedCount) {
          toast.success("User updated");
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
      <div className="container">
        <AuthClientComp />
        <div style={{ minHeight: "20vh" }}></div>
        <form
          onSubmit={handleSubmit(onSubForm)}
          className="col-md-8 p-3 shadow mx-auto h4 form-design text-dark"
        >
          <h2 className="gradi text-center my-5">
            <i className="fa fa-lastfm me-4 mb-2" aria-hidden="true"></i>
            <strong>{catName}</strong> - {subjectName}
          </h2>
          {questions.questions.map((item, key) => {
            return (
              <div className="my-5 text-center mb-3" key={key}>
                <label className="mb-3">
                  {item.question}
                </label>
                <div className="mx-2">
                  <select
                    {...register(`answer${key}`)}
                    className="form-select color-black me-4"
                  >
                    <option value="">Choose Answer</option>
                    {item.options.map((item2, key2) => {
                      return (
                        <option key={key2} value={item2}>
                          {item2}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            );
          })}

          <h1 className="text-center">
            <button className="btnLog mt-4">Submit</button>
          </h1>
          <div style={{ minHeight: "7vh" }}></div>
        </form>
        <div style={{ minHeight: "10vh" }}></div>
      </div>
    );
}

export default TestSkill;
