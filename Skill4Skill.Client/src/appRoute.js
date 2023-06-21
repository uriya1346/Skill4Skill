import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LayoutClient from "./comps/general_comps/layoutClient";
import LayoutAdmin from "./comps_admin/general_admin/layoutAdmin";
import LoginAdmin from "./comps_admin/general_admin/loginAdmin";
import AdminHome from "./comps_admin/general_admin/home";
//groups
import LearningGroupsCatAdmin from "./comps_admin/learningGroups_admin/learningGroupsCatList";
import GroupSearch from "./comps/group_comps/searchGroup";
import EditGroupsCatAdmin from "./comps_admin/learningGroups_admin/editCategoryGroups";
import GroupAdninList from "./comps_admin/learningGroups_admin/groupsAdminList";
import EditGroupsAdmin from "./comps_admin/learningGroups_admin/editProductGroup";
import AddGroupCat from "./comps_admin/learningGroups_admin/addGroupCategory";
import AddGroupProduct from "./comps_admin/learningGroups_admin/addGroupProduct";
import LogoutAdmin from "./comps_admin/general_admin/logoutAdmin";
import SignUpClient from "./comps/users_comps/signupClient";
import LogInClient from "./comps/users_comps/loginClient";
import LogoutClient from "./comps/users_comps/logoutClient";
import Page404 from "./comps/general_comps/page404";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./comps/general_comps/contact";
import GroupListPage from "./comps/group_comps/groupListPage ";
import GroupInfo from "./comps/group_comps/groupInfo ";
import Home from "./comps/general_comps/home";
import UsersList from "./comps_admin/general_admin/usersList";
import GroupCategories from "./comps/group_comps/groupCategories";
import UserInfo from "./comps/users_comps/userInfo";
import BarterHome from "./comps/barter/barterHome";
import BarterForm from "./comps/barter/barterForm";
import BarterCardInfo from "./comps/barter/barterCardInfo";
import Cart from "./comps/users_comps/cart";
import AboutUs from "./comps/general_comps/aboutUs";
//checkout
import CheckoutPremium from "./comps/checkout/checkoutPremium";
//maps
import BarterMap from "./comps/barterMap/barterMap";
//users
import ForgotPassword from "./comps/users_comps/forgotPassword";
//chat
import ChatMain from "./comps/chat/listMessage";
//new group
//import NewGroup from "./comps/group_comps/newGroup";
import LearningPath from "./comps/group_comps/learningPath";
import WaysLearning from "./comps/group_comps/waysLearning";
//barter
import TestSkill from "./comps/barter/testSkill";
function AppRoute(props) {
  return (
    <Router>
      <Routes>
        {/* for ADMIN USER */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<LoginAdmin />}/>
          <Route path="/admin/home" element={<AdminHome />}/>
          <Route path="/admin/users" element={<UsersList />}/>
          <Route path="/admin/logout" element={<LogoutAdmin />}/>
          {/* learning groups admin*/}
          <Route path="/admin/learningGroups" element={<LearningGroupsCatAdmin />}/>
          <Route path="/admin/learningGroups/:url_name" element={<EditGroupsCatAdmin />}/>
          <Route path="/admin/groupsList/:cat_url" element={<GroupAdninList />}/>
          <Route path="/admin/editProductGroups/:id" element={<EditGroupsAdmin />}/>
          <Route path="/admin/addGroupCat" element={<AddGroupCat />}/>
          <Route path="/admin/addGroupProduct" element={<AddGroupProduct />}/>
        </Route>
        {/* for REGULAR USER */}
        <Route path="/" element={<LayoutClient />}>
          {/* USER script */}
          <Route index element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LogInClient />} />
          <Route path="/login/forgotPassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<SignUpClient />} />
          <Route path="/logout" element={<LogoutClient />} />
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/aboutUs" element={<AboutUs/>} />
          {/* GROUP script */}
          <Route path="/groupCat" element={<GroupCategories/> }  />
          <Route path="/group/:cat_url" element={<GroupListPage/>}  />
          <Route path="/groupInfo/:id" element={<GroupInfo/>}  />
          <Route path="/groupSearch/" element={<GroupSearch />}  />
          <Route path="/groupInfo/learningPath:subject" element={<LearningPath />}  />
          <Route path="/groupInfo/waysLearning:subject" element={<WaysLearning />}  />
          {/* BARTER script */}
          <Route path="/barter" element={<BarterHome/>}  />
          <Route path="/barterForm" element={<BarterForm/>}  />
          <Route path="/barterForm/testSkill:data" element={<TestSkill/>}  />
          <Route path="/barter/cardInfo" element={<BarterCardInfo/>}  />
          {/* CHECKOUT script */}
          <Route path="/checkoutPremium" element={<CheckoutPremium />}  />
          {/* MAPS script */}
          <Route path="/barterMap" element={<BarterMap />}  />
          {/* CHAT script */}
          <Route path="/chat:id" element={<ChatMain />}  />

          {/* ERROR 404 */}
          <Route path="/*" element={<Page404 />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" theme="colored" />
    </Router>
  );
}

export default AppRoute;
