import React from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import "./formsstyle.css";

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAutheticated();

  const adminLeftSide = () => {
    return (
      <div className="card division">
        <h4 className="card-header card-title">Admin Navigaton</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-info">
              Create Categories
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-info">
              Manage Categories
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-info">
              Add Product
            </Link>
          </li>

          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-info">
              Manage Products
            </Link>
          </li>


        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card mb-4 division">
        <h4 className="card-header card-title">Admin Information</h4>

        <ul className="list-group fontsize">

          <li className="list-group-item">
              <span className="badge mr-2 badge-color">Name</span> {name}
          </li>
          <li className="list-group-item">
              <span className="badge mr-2 badge-color">Email</span> {email}
          </li>
          <li className="list-group-item">
              <span className="badge mr-2 badge-danger">Admin Area</span> 
          </li>

        </ul>
      </div>
    );
  };

  return (
    <Base title="WEARYOURTEE" description="Admin Dashboard" className="container division p-4">
      <div className="row">
        <div className="col-sm-3">{adminLeftSide()}</div>

        <div className="col-sm-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
