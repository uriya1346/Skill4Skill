import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderAdmin from './headerAdmin';
import "./admin.css"
import Footer from "./adminFooter"

function LayoutAdmin(props){
  return(
    <React.Fragment>
      <HeaderAdmin />
      <Outlet />
      <Footer/>
    </React.Fragment>
  )
}

export default LayoutAdmin