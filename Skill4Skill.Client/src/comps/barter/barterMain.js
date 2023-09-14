import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import BarterCardInfo from "./barterCardInfo";
import Suggestions from "./suggestions";
import { Link } from "react-router-dom";
import AuthClientComp from "../users_comps/authClientComp";
import { PopupContext } from "../../context/shopContext";

function BarterMain(props) {
  const [ar, setAr] = useState([]);
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [suggestionsAr, setSuggestionsAr] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
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
    let suggestions = resp2.data;    
    suggestions = suggestions.filter((suggestion) => {
      return !resp.data.some((item) => item.userId === suggestion._id);
    });

    setSuggestionsAr(suggestions);
    setLoadingFlag(true);
  };

  return (
    <PopupContext.Provider value={{ activePopup, setActivePopup }}>
      <div className="barter-main-container">
        <AuthClientComp />
        <div className="container categories-list py-5">
          {ar.length > 0 && (
            <div>
              <h2 className="text-center gradi text-uppercase">
                <i className="fa fa-lastfm me-3" aria-hidden="true"></i>
                Barters
              </h2>
              <div className="row mt-5">
                {ar.map((item, index) => (
                  <BarterCardInfo
                    key={index}
                    item={item}
                    index={item.userId + "bar"}
                  />
                ))}
              </div>
            </div>
          )}
          {suggestionsAr.length > 0 && (
            <div>
              <hr className="my-5" />
              <h2 className="text-center gradi text-uppercase">
                <i className="fa fa-lastfm me-3" aria-hidden="true"></i>
                Suggestions
              </h2>
              {!loadingFlag ? (
                <div className="text-center mt-4">
                  <BeatLoader />
                </div>
              ) : (
                <div className="row mt-5">
                  {suggestionsAr.map((item, index) => (
                    <Suggestions
                      key={index}
                      item={item}
                      index={item._id + "sug"}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-center py-5">
          <Link to="/barterForm" className="btn btn-warning btn-lg">
            Edit Skills and Preferences
          </Link>
        </div>
      </div>
    </PopupContext.Provider>
  );
}

export default BarterMain;