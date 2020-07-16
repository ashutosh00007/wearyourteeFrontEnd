import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentbhelper";
import { createOrder } from "./helper/orderHelper";
import { isAutheticated } from "../auth/helper";

import DropIn from "braintree-web-drop-in-react";
import { cartEmpty } from "./helper/CartHelper";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {

  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });

  const userId = isAutheticated() && isAutheticated().user._id;
  const token = isAutheticated() && isAutheticated().token;

  const getToken = (userId, token) => {

    getmeToken(userId, token).then(info => {
    //console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
      return (
          <div>
              {info.clientToken !== null  && products.length > 0 ? (
                <Fragment>
                <div><h4 className="p-3 bg-light">Your total Bill is ₹ {getAmount()}</h4></div>
                <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button className="btn btn-block btnclass" onClick={onPurchase}>
              Buy
            </button>
          </div>
                </Fragment>

              ) : (<div className="bg-danger p-2 division"><Link to="/signin" className="btn text-center"><h4 className="text-white">Please Login or Add something to cart</h4></Link></div>)}
          </div>
      )
  }

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount
          };
          createOrder(userId, token, orderData);
          cartEmpty(()=>{
              console.log("Empty cart")
          });
          setReload(!reload);
        })
        .catch(error => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });

        
    });
  };


  const getAmount = () => {
      let amount = 0;
      products.map(p=>{
          amount = amount + p.price
      })
      return amount;
  }


  return (
    <div>
      {showbtdropIn()}
    </div>
  );
};

export default Paymentb;
