import React, { useContext } from "react";
import { API_URL, doApiGet } from "../../services/apiService";
import { toast } from "react-toastify";
import { AppContext } from "../../context/shopContext";
import AuthClientComp from "./authClientComp";

function Cart(props) {
  let item = props.item;
  const { setShowCart } = useContext(AppContext);

  const confirmUser = async (id) => { 
    let url = API_URL + "/users/confirmUser/"+id;
    let resp = await doApiGet(url);
    if (resp.data.modifiedCount) {
      toast.success("User connect successfully");
      setShowCart("none")
    } else {
      toast.warning("there is a problem try again later");
    }
    
  }

  return (
    <div>
      <AuthClientComp/>
    <div key={item._id} className="ms-2 d-flex d-flex justify-content-between">
      <div>
        <p className="me-3">
          {item.first_name} {item.last_name}
        </p>
      </div>
      <div className="me-3">
        <button onClick={()=> confirmUser(item._id)}
          className="btn btn-outline-success badge"
          style={{ height: "4vh" }}
        >
          <i className="fa fa-check" aria-hidden="true"></i>
        </button>
        <button
          className="btn btn-outline-danger badge ms-1"
          style={{ height: "4vh" }}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <hr/>
    </div>
  );
}

export default Cart;
