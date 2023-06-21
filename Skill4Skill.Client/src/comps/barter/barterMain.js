import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import BarterCardInfo from "./barterCardInfo";
import Suggestions from "./suggestions";
import { Link } from "react-router-dom";

function BarterMain(props) {
  const [ar, setAr] = useState([]);
  const [suggestionsAr, setSuggestionsAr] = useState([]);
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/barter";
    let resp = await doApiGet(url);
    const filteredData = resp.data.filter((obj) => obj.userId);
    const groupedData = filteredData.reduce((groups, obj) => {
      const userId = obj.userId;
      if (!groups[userId]) {
        groups[userId] = [];
      }
      groups[userId].push(obj);
      return groups;
    }, {});
    const array = [];
    for (const userId in groupedData) {
      const group = groupedData[userId];
      if (group.length > 1) {
        let obj = group[0];
        for (let i = 1; i < group.length; i++) {
          if (!obj.subCat.includes(group[i].subCat))
            obj.subCat = obj.subCat + ", " + group[i].subCat;
          if (!obj.canOfferSubCat.includes(group[i].canOfferSubCat))
            obj.canOfferSubCat =
              obj.canOfferSubCat + ", " + group[i].canOfferSubCat;
          if (!obj.canOfferCat.includes(group[i].canOfferCat))
            obj.canOfferCat = obj.canOfferCat + "," + group[i].canOfferCat;
          if (!obj.catNum.includes(group[i].catNum))
            obj.catNum = obj.catNum + "," + group[i].catNum;
        }
        array.push(obj);
      } else {
        array.push(group[0]);
      }
    }
    setAr(array);
    let url2 = API_URL + "/barter/suggestions";
    let resp2 = await doApiGet(url2);
    setSuggestionsAr(resp2.data);
  };

  return (
    <div
      className="container-fluid"
      style={{ overflow: "hidden", height: "100%" }}
    >
      <div style={{ minHeight: "5vh" }}></div>
      <div className="container categories_list">
        <h2 className="text-center gradi text-uppercase">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Your
          adjustments
        </h2>
        <div className="row">
          {ar.map((item, index) => {
            return <BarterCardInfo key={index} item={item} />;
          })}
        </div>
        <hr />
        <h2 className="text-center gradi text-uppercase">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>
          suggestions for you
        </h2>
        <div className="row">
          {suggestionsAr.map((item, index) => {
            return <Suggestions key={index} item={item} />;
          })}
        </div>
        {ar.length === 0 ? (
          <div className="text-center mt-4">
            <BeatLoader />
          </div>
        ) : (
          ""
        )}
      </div>
      <div style={{ minHeight: "35vh" }}></div>
      <div className="text-center">
        <Link to="/barterForm" className="btn btn-warning">
          Edit preferences and knowledge
        </Link>
      </div>
    </div>
  );
}

export default BarterMain;
