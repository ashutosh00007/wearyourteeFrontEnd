import React, { Fragment } from 'react';
import { API } from '../../backend';


const ImageHelper = ({product}) => {
    const imageurl = product ? `${API}/product/photo/${product._id}` : "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled.png"
    return ( 
        <Fragment>
        <img
        src={imageurl}
        alt="photo"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
        className="mb-3 rounded"
      />
      </Fragment>
     );
}
 
export default ImageHelper;