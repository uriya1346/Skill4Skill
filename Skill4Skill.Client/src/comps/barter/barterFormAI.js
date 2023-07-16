import React, { useEffect, useState, useRef } from "react";
import AuthClientComp from "../users_comps/authClientComp";

function BarterForm(props) {
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [skillsError, setSkillsError] = useState("");
  const [interestsError, setInterestsError] = useState("");

  const handleSkillsChange = (event) => {
    setSkills(event.target.value);
  };

  const handleInterestsChange = (event) => {
    setInterests(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate inputs
    if (skills.trim() === "") {
      setSkillsError("Skills field is required");
      return;
    }
    if (interests.trim() === "") {
      setInterestsError("Interests field is required");
      return;
    }

    // Handle form submission logic here
    console.log("Skills:", skills);
    console.log("Interests:", interests);

    // Reset form fields and error messages
    setSkills("");
    setInterests("");
    setSkillsError("");
    setInterestsError("");
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <AuthClientComp />
      <div style={{ minHeight: "20vh" }}></div>
      <form onSubmit={handleSubmit} style={{width:"80%"}}>
      <div className="form-group col-md-8 text-center">
        <label htmlFor="skillsTextarea">Skills:</label>
        <textarea
          className="form-control"
          id="skillsTextarea"
          rows="3"
          value={skills}
          onChange={handleSkillsChange}
          placeholder="Enter your skills..."
          required
        ></textarea>
        {skillsError && <div className="invalid-feedback">{skillsError}</div>}
      </div>
      <div className="form-group col-md-8 text-center">
        <label htmlFor="interestsTextarea">Interests:</label>
        <textarea
          className="form-control"
          id="interestsTextarea"
          rows="3"
          value={interests}
          onChange={handleInterestsChange}
          placeholder="Enter your interests..."
          required
        ></textarea>
        {interestsError && (
          <div className="invalid-feedback">{interestsError}</div>
        )}
      </div>
      <div className="form-group col-md-8 text-center">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>  
      </form>
      <div style={{ minHeight: "10vh" }}></div>
    </div>
  );
}

export default BarterForm;
