import React, { useState } from 'react';
import {Link} from "react-router-dom"
import Base from '../core/Base';
import "./formsstyle.css";
import { signup } from '../auth/helper';

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
      });
    
      const { name, email, password, error, success } = values;

      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

     const onSubmit = event => {
     event.preventDefault();
     setValues({ ...values, error: false });
     signup({ name, email, password })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
     };

    const signUpForm = () => {
        return (

                  <form className="p-4">

                  <div className="form-group">
                  <input className="form-control"
                  autoFocus 
                  onChange={handleChange("name")}
                  type="text" value={name} placeholder="Name"/>
                  </div>

                  <div className="form-group">
                  <input className="form-control"
                  autoFocus 
                  onChange={handleChange("email")} 
                  type="email" value={email} placeholder="Email" />
                  </div>

                  <div className="form-group">
                  <input className="form-control"
                  autoFocus 
                  onChange={handleChange("password")} 
                  type="password" value={password} placeholder="Password" />
                  </div>

                  <button style={{marginTop:60}} onClick={onSubmit} className="btn btnclass btn-block">Submit</button>
                  
                     
                  </form>

        )
    }

    const successMessage = () => {
        return (
        
        <div className="row" style={{display: success ? "" : "none" }}>
         <div className="col-md-6 offset-sm-3 text-center">
          <div className="alert alert-success">
            New account created successfully. Please
            <Link to="/signin"> Login Here</Link>
          </div>
         </div>
        </div>
        );
    }


    const errorMessage = () => {
        return (

            <div className="row" style={{display: error ? "" : "none" }}>
            <div className="col-md-6 offset-sm-3 text-center">

        <div className="alert alert-danger">
        {error}
        </div>

        </div>

        </div>
        );
    }

    return ( 
        <div>
        <Base description="SIGN UP" className="container p-4">

        <div className="card mb-4 division">
        <h4 className="card-header card-title">Sign up</h4>
        

        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        
        

        </div>

        </Base>


        </div>
     );
}
 
export default Signup;