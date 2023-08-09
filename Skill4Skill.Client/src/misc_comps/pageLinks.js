import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doApiGet } from '../services/apiService';

function PageLinks(props) {
  const nav = useNavigate();
  const location = useLocation();
  const [pages, setPages] = useState(0);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    doApi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // This effect will re-run whenever the location changes
    // It recalculates the number of pages and sets the state accordingly
    doApi();
  }, [location.pathname]); // Run this effect when location.pathname changes

  const doApi = async () => {
    let url = props.apiUrlAmount;
    let resp = await doApiGet(url);
    setPages(Math.ceil(resp.data.amount / props.perPage));
  };

  useEffect(() => {
    // Extract the page number from the current URL
    const currentPage = parseInt(new URLSearchParams(location.search).get('page'));
    setActivePage(currentPage || 1); // If currentPage is null or undefined, use 1 as the default value
  }, [location.search]);

  return (
    <div className='my-3'>
      {[...Array(pages)].map((item, i) => {
        const page = i + 1;
        const isActivePage = page === activePage;

        return (
          <button
            key={i}
            className={isActivePage ? `${props.clsCss} active` : props.clsCss}
            onClick={() => {
              nav(`${props.urlLinkTo}?page=${page}`);
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default PageLinks;
