import { RETRIEVE_CATEGORIES } from "./types";
  
  import CategoryDataService from "../Services/category.service";
    export const retrieveCategories = () => async (dispatch) => {
      try {
        const res = await CategoryDataService.getAll();
    
        dispatch({
          type: RETRIEVE_CATEGORIES,
          payload: res.data,
        });
        
      } catch (err) {
        console.log(err);
      }
    };