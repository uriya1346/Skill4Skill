import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import GroupCatItem from "./groupCatItem";

function RentalCat(props) {
  const [ar, setAr] = useState([]);
  let inputRef = useRef();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  },[]);

  const doApi = async () => {
    let url = API_URL + "/categoriesGroup";
    let resp = await doApiGet(url);
    setAr(resp.data);
  };

  const onKeyboardClick = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };
  const onSearchClick = () => {
    let input_val = inputRef.current.value;
    if (input_val) {
      nav("/groupSearch?s=" + input_val);
    }
  };

  return (
    <div className="container-fluid mb-5">
      <div style={{ minHeight: "13vh" }}></div>
      <div className="container py-4 categories_list">
        <h2 className="text-center gradi text-uppercase">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>OUR
          categories
        </h2>
        <div>
          <div className=" d-flex inp form__group field">
            <input
              onKeyDown={onKeyboardClick}
              className="form__field my-2"
              ref={inputRef}
              placeholder="Type subject name..."
              type="search"
            />
            <button onClick={onSearchClick} className="btn text-white">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {ar.length === 0 ? (
          <div className="text-center mt-4">
            {" "}
            <BeatLoader />{" "}
          </div>
        ) : (
          ""
        )}
        <div className="ag-format-container">
          <div className="ag-courses_box">
            {ar.map((item) => {
              return <GroupCatItem key={item._id} item={item} />;
            })}
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RentalCat;
