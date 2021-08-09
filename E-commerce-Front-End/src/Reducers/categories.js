import { RETRIEVE_CATEGORIES } from "../Actions/types";
  
  const initialState = [];
  
  function categoryReducer(categories = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {

      case RETRIEVE_CATEGORIES:
        return payload;

      default:
        return categories;
    }
  };
  
  export default categoryReducer;