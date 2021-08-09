import {
    CREATE_PRODUCT,
    RETRIEVE_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    SEARCH_PRODUCT, 
    CLEAR_PRODUCTS
  } from "../Actions/types";
  
  const initialState = null;
  
  function productReducer(products = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {

      case CREATE_PRODUCT:
        products._embedded.products.push(payload)
        return {...products};
      
      case RETRIEVE_PRODUCTS:
        return payload;
      
      case UPDATE_PRODUCT:
        const UpdatedList = products._embedded.products.map((product) => {
          if (product.id === payload.id) 
            return{...product , ...payload};  
          else 
            return product
        });
        return {...products,  _embedded : {products : UpdatedList} }

      case DELETE_PRODUCT:
        const filtredList = products._embedded.products.filter(product => product.id !== payload);
        return {...products , _embedded : {products : filtredList} }
      
      case SEARCH_PRODUCT:
        return payload;
      
      case CLEAR_PRODUCTS:
        return null;
      
      default:
        return products;
        
    }
  };
  
  export default productReducer;