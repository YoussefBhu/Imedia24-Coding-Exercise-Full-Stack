import http from "../http-common";
import { apiUrl } from "../Environement";

class ProductDataService {
  getAll(id,page) {
    //i could have used '/categories/id/products' but it doesn't afford a pageable result 
    return http.get(`/products/search/findByCategoriesContains?cat=${apiUrl}/categories/${id}&page=${page}&size=5`);
  }

  get(id) {
    return http.get(`/products/${id}`);
  }

  create(data) {
    return http.post("/api/products", data);
  }

  update(data) {
    return http.put(`/products/${data.id}`, data);
  }

  delete(id) {
    return http.delete(`/products/${id}`);
  }

  deleteAll() {
    return http.delete(`/products`);
  }

  search(key,page){
    return http.get(`/products/search/findByNameContaining?key=${key}&page=${page}&size=5`)
  }

}

export default new ProductDataService ();