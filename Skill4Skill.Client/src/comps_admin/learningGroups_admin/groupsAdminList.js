import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageLinks from "../../misc_comps/pageLinks";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function RentalAdminList(props) {
  let nav = useNavigate();
  const [ar, setAr] = useState([]);

  const [shortId, setShortId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const location = useLocation();

  let params = useParams();

  useEffect(() => {
    setAr([]);
    doApi();
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let urlCategory = API_URL + "/categoriesGroup/single/" + params.cat_url;
    let resp1 = await doApiGet(urlCategory);
    let short_id = resp1.data?.short_id;
    setShortId(short_id);
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let urlProds =
      API_URL + "/group/?perPage=10&cat=" + short_id + "&page=" + pageQuery;
    let resp2 = await doApiGet(urlProds);
    setAr(resp2.data);
    let urlAmounts = API_URL + "/group/amount?cat=" + short_id;
    let resp3 = await doApiGet(urlAmounts);
    setAmount(resp3.data.amount);
  };


  const delProd = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/group/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          let catName = params.cat_url.substring(0, params.cat_url.length-1)
          toast.info(`${catName} delted!`);
        }
        doApi();
      } catch (err) {
        console.log(err.response);
        doApi();
      }
    }
  };

  return (
    <div className="container-fluid mb-5" style={{ minHeight: "85vh" }}>
       <div style={{ minHeight: "15vh" }}></div>
      <div className="container">
        <h1 className="text-center gradi text-uppercase">
          <i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>{params.cat_url}
        </h1>
        {ar.length === 0 ? (
          <h2 className="text-center">
            <BeatLoader />
          </h2>
        ) : (
          ""
        )}
        <table className="table table-bordered table-dark table-striped table-responsive flex-md-column-reverse col-lg-6 my-5 text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>
                Name<i className="fa fa-user ms-2" aria-hidden="true"></i>
              </th>
              <th>
                Information<i className="fa fa-search ms-2" aria-hidden="true"></i>
              </th>
              <th>
                Del/Edit<i className="fa fa-pencil ms-2" aria-hidden="true"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {ar.map((item, i) => {
              return (
                <tr className="link alert-link" key={item._id}>
                  <td>{i + 1 + 8 * (pageNum - 1)}</td>
                  <td>{item.name}</td>
                  <td>{item.info}</td>
                  <td>
                    <button
                      onClick={() => {
                        delProd(item._id);
                      }}
                      className="badge btn btn-outline-danger"
                    >
                      X
                    </button>
                    <button
                      onClick={() => {
                        nav("/admin/editProductGroups/" + item._id);
                      }}
                      className="badge btn btn-outline-success"
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {amount < 9 ? (
          ""
        ) : (
          <PageLinks
            perPage="8"
            apiUrlAmount={API_URL + "/group/amount?cat=" + shortId}
            urlLinkTo={"/admin/groupsList/" + params.cat_url}
            clsCss="btn btn-dark me-1 border-white"
          />
        )}
      </div>
      <div style={{ minHeight: "3vh" }}></div> 
    </div>
  );
}

export default RentalAdminList;
