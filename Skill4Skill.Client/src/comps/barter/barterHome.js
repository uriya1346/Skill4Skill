import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import AuthClientComp from "../users_comps/authClientComp";
import BarterMain from "./barterMain"


function RentalCat(props) {
  const [interestedAr, setInterestedAr] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    let resp = await doApiGet(url);
    setInterestedAr(resp.data.interested);
  };



  return (
    <div className="container-fluid mb-5">
      <AuthClientComp />
      <div style={{ minHeight: "13vh" }}></div>
      {interestedAr.length === 0 ? 
        <div className="text-center h1" style={{ marginTop: "30vh" }}>
          You must fill out an information form
          <br/>
        <div className="mt-3">
          <Link
            to={"/barterForm"}
            className="text-center text-decoration-none btn btn-dark p-2"
          >
           Go To Form
          </Link>
          </div>
        </div>
       : 
       <BarterMain/>
      }

    </div>
  );
}

export default RentalCat;
