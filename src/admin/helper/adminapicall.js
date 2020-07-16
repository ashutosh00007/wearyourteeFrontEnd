import {API} from "../../backend";

//Category Calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,
    {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(res => {
        return res.json()
    })
    .catch(err=> console.log(err));
};

//get All Categories

export const getCategories = () => {

    return fetch(`${API}/categories`,{
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err=>console.log("THIS IS THE ERROR",err))
}

//getacategory

export const getaCategory = (categoryId) => {

    return fetch(`${API}/category/${categoryId}`,{
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err=>console.log("THIS IS THE ERROR",err))
}

//update category

export const updateaCategory = (categoryId, userId, token, category) => {
   
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err);
    })
};


//delete categories

export const deleteCategory = (categoryId,userId,token) => {
 
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
}





//Product Calls


//create a product
export const createaProduct = (userId, token, product) => {
   
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err);
    })
};

//get all products

export const getProducts = () => {
    return fetch(`${API}/products`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

//get a product

export const getaProduct = (productId) => {

    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    })
    .then(res => {
        return res.json();
    })
    .catch(err=>console.log(err));
};

//delete a product

export const updateaProduct = (productId, userId, token, product) => {
   
    return fetch(`${API}/product/${userId}/${productId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(res=>{
        return res.json();
    })
    .catch(err=>{
        console.log(err);
    })
};



//delete a product



export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${userId}/${productId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

