import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import { BeatLoader } from 'react-spinners'
import GroupItem from './groupItem';
import PageLinks from '../../misc_comps/pageLinks';

function GroupsListPage(props) {
  const [ar, setAr] = useState([])
  const [shortId, setShortId] = useState(0)
  const [amount, setAmount] = useState(0)
  const location = useLocation();
  let nav = useNavigate()
  let params = useParams();

  useEffect(() => {
    setAr([]);
    doApi();
  },[location]);// eslint-disable-line react-hooks/exhaustive-deps

  const doApi = async () => {
    let urlCategory = API_URL + "/categoriesGroup/single/" + params.cat_url;
    let resp1 = await doApiGet(urlCategory);
    let short_id = resp1.data?.short_id;
    setShortId(short_id)
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    let urlProds = API_URL + "/group/?perPage=6&cat=" + short_id + "&page=" + pageQuery;
    let resp2 = await doApiGet(urlProds)
    setAr(resp2.data)
    let urlAmounts = API_URL + "/group/amount?cat=" + short_id;
    let resp3 = await doApiGet(urlAmounts);
    setAmount(resp3.data.amount)

  }
  return (
    <div className='container-fluid mb-5' style={{ minHeight: "85vh" }} >
      <div style={{ minHeight: "15vh" }}></div>
      <div className="container">
        <h1 className='text-center gradi'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Groups of {params.cat_url}</h1>
        {ar.length === 0 ? <h2 className='text-center'><BeatLoader /></h2> : ""}
        <div className="ag-format-container">
         <div className="ag-courses_box">

          {ar.map(item => {
            return (
              <GroupItem key={item._id} item={item} />
            )
          })}
        </div>
        </div>
        <div className='d-flex'>
          <button onClick={() => {
            nav("/groupCat");
          }} className='btn btn-outline-light me-3 py-1 my-3'><i className="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
          {amount>6 ?
            <PageLinks perPage="6" apiUrlAmount={API_URL + "/group/amount?cat=" + shortId} urlLinkTo={"/group/" + params.cat_url} clsCss="btn btn-outline-light mx-2 px-md-5" />
          :""}
        </div>
      </div>
      <div style={{ minHeight: "3vh" }}></div>
    </div>
  )
}

export default GroupsListPage