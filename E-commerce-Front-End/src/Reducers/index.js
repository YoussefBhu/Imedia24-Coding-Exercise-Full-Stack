import { combineReducers } from "redux";
import categories from "./categories";
import products from "./products"; 
import params from "./param"
export default combineReducers({
  params,
  categories,
  products
});