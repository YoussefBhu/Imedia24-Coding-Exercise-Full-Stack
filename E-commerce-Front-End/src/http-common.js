import axios from "axios";
import { apiUrl } from "./Environement";

export default axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-type": "application/json"
  }
});