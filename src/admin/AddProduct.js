import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getCategories, getaProduct, createaProduct } from "./helper/adminapicall";
import { isAutheticated } from "../auth/helper/index"
import UpdateProduct from "./UpdateProduct";

const AddProduct = () => {
    const { user, token } = isAutheticated();

    const [values, setValues] = useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      photo: "",
      categories: [],
      category: "",
      loading: false,
      error: "",
      createdProduct: "",
      getaRedirect: false,
      formData: ""
    });
  
    const {
      name,
      description,
      price,
      stock,
      categories,
      category,
      loading,
      error,
      createdProduct,
      getaRedirect,
      formData
    } = values;
  
    const preload = () => {
      getCategories().then(data => {
        //console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, categories: data, formData: new FormData() });
        }
      });
    };
  
    useEffect(() => {
      preload();
    }, []);
  
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: "", loading: true });
      createaProduct(user._id, token, formData).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name
          });
        }
      });
    };
  
    const handleChange = name => event => {
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };
  
    const successMessage = () => (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created successfully</h4>
      </div>
    );
 

  const createProductForm = () => (

 

    <form className="p-4">
    <div className="form-group">
    {goBack()}

    {successMessage()}

    

    <span>Post photo</span>
  <div className="form-group">
    <label className="btn btn-block bg-light">
      <input
       onChange={handleChange("photo")}
        type="file"
        name="photo"
        accept="image"
        placeholder="choose a file"
      />
    </label>
  </div>
    
    <div className="form-group">
    <input className="form-control my-3"
    type="text" 
    autoFocus 
    required placeholder="Name of T-Shirt. ex: Coder t-shirt Black"
      onChange={handleChange("name")}
      name="photo"
      value={name} />
    </div>

    <div className="form-group">
    <textarea
      onChange={handleChange("description")}
      name="photo"
      className="form-control"
      placeholder="Description"
      value={description}
    />

    <div className="form-group mt-3">
    <input
      onChange={handleChange("price")}
      type="number"
      className="form-control"
      placeholder="Price"
      value={price}
    />
  </div>

  <div className="form-group">
    <select
      onChange={handleChange("category")}
      className="form-control"
      placeholder="Category"
    >
      <option>Select</option>
      {categories && categories.map((cate, index)=>(
        <option key={index} value={cate._id}>{cate.name}</option>
      ))}
    
    </select>
  </div>

  <div className="form-group">
    <input
      onChange={handleChange("stock")}
      type="number"
      className="form-control"
      placeholder="Stock"
      value={stock}
    />
  </div>

  </div>


    <button style={{marginTop:60}} onClick={onSubmit} className="btn btnclass">Add Product</button>
    
       
   
    </div>
    </form>
  
  )


  const goBack = () => (
    <div className="mt-1">
      <Link className="btn btn-sm btn-danger backbtn mb-3" to="/admin/dashboard">
      <i className="fa fa-arrow-left" aria-hidden="true"></i>  Admin Home
      </Link>
    </div>
  );



return ( 
    <Base description="Add a New Product" className="container p-4">
    <div className="card mb-4 division">
    <h4 className="card-header card-title">Add New Product</h4>
    

    {createProductForm()} 
    

    </div>
    </Base>
 );
};

export default AddProduct;
