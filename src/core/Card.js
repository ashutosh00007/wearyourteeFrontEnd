import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload= f => f, reload= undefined }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);
  
    const cardTitle = product ? product.name : "A photo from pexels";
    const cardDescrption = product ? product.description : "Default description";
    const cardPrice = product ? product.price : "DEFAULT";
  
    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true));
    };
  
    const getARedirect = redirect => {
      if (redirect) {
        return <Redirect to="/cart" />;
      }
    };
  
    const showAddToCart = addtoCart => {
      return (
        addtoCart && (
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        )
      );
    };
  
    const showRemoveFromCart = removeFromCart => {
      return (
        removeFromCart && (
          <button
            onClick={() => {removeItemFromCart(product._id);
            setReload(!reload)
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
          >
            Remove from cart
          </button>
        )
      );
    };

        return (
          <div className="card bg-light card-hover">
            <div className="card-header card-title lead">{cardTitle}</div>
            <div className="card-body p-4">
              {getARedirect(redirect)}
              <div className="rounded border border-info p-2" >
              <ImageHelper product={product}/>
              </div>
              <p className="lead font-weight-normal mt-2 px-3 text-wrap">
                {cardDescrption}
              </p>
              <p className="btn rounded px-3 btn-sm px-4 text-center">₹ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };


 
export default Card;