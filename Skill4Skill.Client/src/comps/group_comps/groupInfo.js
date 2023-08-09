import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import { addProdVisitedToLocal } from "../../services/localService";

function RentalCarInfo(props) {
  const [group, setGroup] = useState({});
  let params = useParams();
  let location = useLocation();

  useEffect(() => {
    doApi();
  },[location]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let url = API_URL + "/group/single/" + params.id;
    let resp = await doApiGet(url);
    setGroup(resp.data);
    addProdVisitedToLocal(resp.data.short_id);
  };

  return (
    <div className="container">
      <div style={{ minHeight: "17vh" }}></div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h1 className="text-center mb-4">
                <i className="fa fa-lastfm me-2" aria-hidden="true"></i>
                {group.name}
              </h1>
              <p className="text-muted text-center">{group.info}</p>
              <div className="text-center my-5">
                <img src="/images/logo.png" height={"35vh"} alt="logo-no-background"/>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Link
                  className="btn btn-primary mb-3"
                  to={ "/groupInfo/learningPath"+group.name}
                >
                  Get the learning path!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ minHeight: "17vh" }}></div>
    </div>
  );
}

export default RentalCarInfo;
