import {
  CREATE_PRODUCT,
  RETRIEVE_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  SEARCH_PRODUCT,
  CLEAR_PRODUCTS
} from "./types";

import ProductDataService from "../Services/product.service";

export const createProduct = (data) => async (dispatch) => {
  try {
    const res = await ProductDataService.create(data);

    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveProducts = (id,page=0) => async (dispatch) => {
  try {
    const res = await ProductDataService.getAll(id,page);

    dispatch({
      type: RETRIEVE_PRODUCTS,
      payload: res.data,
    });
    
  } catch (err) {
    console.log(err);
  }
};

export const updateProduct = (data) => async (dispatch) => {
  try {
    const res = await ProductDataService.update(data);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await ProductDataService.delete(id);

    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });

  } catch (err) {
    console.log(err);
  }
};

export const searchProduct = (key,page=0) => async (dispatch) =>{
    try {
      const res = await ProductDataService.search(key,page);

      dispatch({
        type: SEARCH_PRODUCT,
        payload: res.data,
      });

    } catch (err) {
      console.log(err);
    }
  };

export const clearProducts = () => async (dispatch) => {
  dispatch({
    type : CLEAR_PRODUCTS
  })
}