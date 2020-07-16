import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom"
import Base from '../core/Base';
import { signin, authenticate, isAutheticated } from '../auth/helper'


const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        didRedirect: false
      });
    
      const { email, password, error, loading, didRedirect } = values;
      const { user } = isAutheticated();
    
      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    
      const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
          .then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error, loading: false });
            } else {
              authenticate(data, () => {
                setValues({
                  ...values,
                  didRedirect: true
                });
              });
            }
          }).then(console.log("signin Successful"))
          .catch(console.log("signin request failed"));
      };
    
      const performRedirect = () => {
        //TODO: do a redirect here
        if (didRedirect) {
          if (user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
          } else {
            return <Redirect to="/admin/dashboard" />;
          }
        }
        if (isAutheticated()) {
          return <Redirect to="/" />;
        }
      };
    
      const loadingMessage = () => {
        return (
          loading && (
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          )
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };
    
    const signInForm = () => {
        return (

                  <form className="p-4">
    
                  <div className="form-group">
                  <input className="form-control"
                  autoFocus
                  type="email" onChange={handleChange("email")} value={email} placeholder="Email" />
                  </div>
    
                  <div className="form-group">
                  <input className="form-control" 
                  autoFocus
                  type="password" onChange={handleChange("password")} value={password} placeholder="Password" />
                  </div>
    
                  <button style={{marginTop:60}} onClick={onSubmit} className="btn btnclass btn-block">Submit</button>
                  
                     
                  </form>

        )
    }




    return ( 
        <div>
        <Base description="SIGN IN" className="container p-4">

        <div className="card mb-4 division">
        <h4 className="card-header card-title">Sign in</h4>
        

        {loadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        

        </div>
        </Base>
        </div>
     );
}
 
export default Signin;