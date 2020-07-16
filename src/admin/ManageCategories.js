import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { isAutheticated } from '../auth/helper';
import { getCategories, deleteCategory } from './helper/adminapicall';
import { Link } from 'react-router-dom';


const ManageCategories = () => {

    const [categories, setCategories] = useState([]);


    const { user, token } = isAutheticated();
  
    const preload = () => {
      getCategories().then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
            setCategories(data);
        }
      });
    };
  
    useEffect(() => {
      preload();
    }, []);
  
  
    const deleteThisProduct = productId => {
      deleteCategory(productId, user._id, token).then(data => {
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
          <h2 className="text-center my-3 mb-4">Categories found</h2>
             
           {categories.map((category, index)=>(
            
            <div key={index} className="row text-center mb-2 bg-light p-3">
            
            <div className="col-4">
              <h5 className="text-left">{category.name}</h5>
            </div>
            <div className="col-4">
              <Link
                className="btn btn-success backbtn"
                to={`/admin/category/update/${category._id}`}
              >
                <span className="">Update</span>
              </Link>
            </div>
            <div className="col-4">
              <button onClick={() => {deleteThisProduct(category._id);}} className="btn backbtn btn-danger">
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
        <Base description="Manage Your Product Categories" className="container p-4">
        <div className="card mb-4 division">
          <h4 className="card-header card-title">Categories Found</h4>
  
          {productDiv()}
  
        </div>
      </Base>
     );
}
 
export default ManageCategories;