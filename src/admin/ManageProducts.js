import React, { useState, useEffect, Fragment } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";



const ManageProducts = () => {

  const [products, setProducts] = useState([]);


  const { user, token } = isAutheticated();

  const preload = () => {
    getProducts().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);


  const deleteThisProduct = productId => {
    deleteProduct(productId, user._id, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };




  const productDiv = () => (

    <div className="row">
    <div className="col-sm-12 p-5">
    {goBack()}
      <h2 className="text-center my-3 mb-4">Products found</h2>
         
       {products.map((product, index)=>(
        
        <div key={index} className="row text-center mb-2 bg-light p-3">
        
        <div className="col-4">
          <h5 className="text-left">{product.name}</h5>
        </div>
        <div className="col-4">
          <Link
            className="btn btn-success backbtn"
            to={`/admin/product/update/${product._id}`}
          >
            <span className="">Update</span>
          </Link>
        </div>
        <div className="col-4">
          <button onClick={() => {deleteThisProduct(product._id);}} className="btn backbtn btn-danger">
            Delete
          </button>
        </div>
        </div>
       ))}
          
        
      </div>
    </div>
  

 );

  const goBack = () => (
    <div className="mt-1">
      <Link className="btn btn-sm btn-danger backbtn mb-3" to="/admin/dashboard">
      <i className="fa fa-arrow-left" aria-hidden="true"></i>  Admin Home
      </Link>
    </div>
  );


  return (
    <Base description="Manage Your Products" className="container p-4">
      <div className="card mb-4 division">
        <h4 className="card-header card-title">All Products</h4>

        {productDiv()}

      </div>
    </Base>
  );

  };


export default ManageProducts;
