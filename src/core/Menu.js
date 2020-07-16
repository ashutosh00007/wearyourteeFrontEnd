import React,{ Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper/index"

const currentTab = (history, path) => {
   if(history.location.pathname === path){
       return {color: "#5E5E5E"}
   } else {
       return {color: "#FFFFFF"}
   }
}

const Menu = ({history}) => (
  <div>

  <nav className="navbar navbar-expand-lg navbar-light navigation">
  <Link className="navbar-brand text-white" to="/">WEARYOURTEE.</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    
      <li className="nav-item">
      <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
      </li>

      <li className="nav-item">
      <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart"><i className="fa fa-shopping-cart icon" aria-hidden="true"></i></Link>
      </li>

      {isAutheticated() && isAutheticated().user.role === 0 && (
        <li className="nav-item">
      <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
      </li>
      )}

      {isAutheticated() && isAutheticated().user.role === 1 && (
        <li className="nav-item">
      <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin</Link>
      </li>
      )}

      
      {!isAutheticated() && (
        <Fragment>
      <li className="nav-item">
      <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Sign up</Link>
      </li>

      <li className="nav-item">
      <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Sign in</Link>
      </li>
      </Fragment>
      )}

      {isAutheticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-danger hover"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}

    </ul>
  </div>
</nav>

</div>




);

export default withRouter(Menu);
