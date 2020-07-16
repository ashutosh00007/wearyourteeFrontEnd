import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import PaymentB from "./PaymentB";

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false)

    useEffect(()=>{
      setProducts(loadCart);
    },[reload]);
   
    const loadAllProducts = (products) => {
        return(
            <div className="division p-5">
                <h3 className="mb-5 card-title p-3"><i className="fa fa-shopping-cart" aria-hidden="true"></i> Products in your Cart</h3>
                {products.map((product, index) => (
                  <div key={index} className="mb-4">
                    <Card 
                    key={index} 
                    product={product}
                    removeFromCart={true}
                    addtoCart={false}  
                    setReload={setReload}
                    reload={reload}
                    />
                  </div>
                ))}
            </div>
        )
    }

    const loadCheckOut = () => {
        return(
            <div className="division p-5">
                <h3 className="mb-4 p-3 card-title">Checkout with Payment</h3>
                <PaymentB products={products} setReload={setReload}/>
            </div>
        )
    }



  return (
    <Base title="WEARYOURTEE." description="Your Cart" className="container">
      <div className="row">
        <div className="col-sm-6">{products.length > 0 ? (loadAllProducts(products)) : (
            <div className="division p-5">
                <h3 className="mb-5 card-title p-3"><i className="fa fa-shopping-cart" aria-hidden="true"></i> No product in your cart</h3></div>) }</div>
        <div className="col-sm-6">{loadCheckOut()}</div>
      </div>
    </Base>
  );
}

export default Cart;