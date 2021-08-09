package com.imedia24.ecommerce.demo.Repositories;

import com.imedia24.ecommerce.demo.Entities.Category;
import com.imedia24.ecommerce.demo.Entities.Product;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@Api
@CrossOrigin
@RestResource
public interface ProductRepository extends JpaRepository<Product,Long> {

    // to afford a pageable results when user search for a product or explore category's products
    @ApiOperation(value = "End point to search products by name with pageable result")
    Page<Product> findByNameContaining(String key , Pageable pag) ;
    @ApiOperation(value = "End point to get category's products with pageable result")
    Page<Product> findByCategoriesContains(Category cat , Pageable pag) ;
}
