import { Link } from 'react-router-dom';
import AuthAdminComp from '../../misc_comps/authAdminComp';

function CheckoutMain(props) {

return(
<div className='container-fluid shadow'>
<AuthAdminComp/>
<div style={{backgroundImage:"url(/images/adminHome.jpg)"}} className='strip_home container-fluid d-flex align-items-center'>
    </div> 
<div className='container py-4 categories_list'>
  <h2 className='text-center gradi text-uppercase'><i className="fa fa-lastfm me-4 mb-4" aria-hidden="true"></i>Home Panel</h2>
  <div className="row justify-content-around">
        <Link to={"/admin/learningGroups"} className='myCard col-md-6 p-3'>
          <div className="shadow  bg-dark gradi">
            <div style={{ backgroundImage: `url("/images/adminGroups.jpg")`}} className='img_card'></div>
            <h3 className='text-center p-3'>Learning Groups</h3>
          </div>
        </Link>
        <Link to={"/admin/checkout/sale"} className='myCard col-md-6 p-3'>
          <div className="shadow  bg-dark gradi">
            <div style={{ backgroundImage: `url("/images/adminBarters.jpg")`,  backgroundPosition:"35% 75%"}} className='img_card'></div>
            <h3 className='text-center p-3'>Barters</h3>
          </div>
        </Link>
        <Link to={"/admin/users"} className='myCard col-md-6 p-3'>
          <div className="shadow  bg-dark gradi">
            <div style={{ backgroundImage: `url("/images/adminUsers.jpg")`,  backgroundPosition:"35% 75%"}} className='img_card'></div>
            <h3 className='text-center p-3'>Users</h3>
          </div>
        </Link>
      </div>
</div>
<div style={{ minHeight: "3vh" }}></div>
</div> 
)
}

export default CheckoutMain