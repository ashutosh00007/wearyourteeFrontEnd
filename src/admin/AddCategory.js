import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";



const AddCategory = () => {

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAutheticated();

  const goBack = () => (
    <div className="mt-1">
      <Link className="btn btn-sm btn-danger backbtn mb-3" to="/admin/dashboard">
      <i className="fa fa-arrow-left" aria-hidden="true"></i>  Admin Home
      </Link>
    </div>
  );

  const handleChange = event => {
    setSuccess(false);
    setError("");
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then(data => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create category</h4>;
    }
  };

  const myCategoryForm = () => (

    <form className="p-4">
    <div className="form-group">
    {goBack()}
    {successMessage()}
    {warningMessage()}
    <form>
    
    <div className="form-group">
    <input className="form-control my-3"
    onChange={handleChange}
    value={name}
    type="text" 
    autoFocus 
    required placeholder="Name of Category ex. Summer" />
    </div>


    <button style={{marginTop:60}} onClick={onSubmit} className="btn btnclass">Create Category</button>
    
       
    </form>
    </div>
    </form>
  
  )

  
  return (
    <Base
      description="Add a new Category for new T-stirts"
      className="container p-4"
    >
      <div className="card mb-4 division">
        <h4 className="card-header card-title">Enter the Category</h4>
        

        {myCategoryForm()} 
        

      </div>
    </Base>
  );
};

export default AddCategory;
