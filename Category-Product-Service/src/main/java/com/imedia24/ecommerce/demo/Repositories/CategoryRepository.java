package com.imedia24.ecommerce.demo.Repositories;

import com.imedia24.ecommerce.demo.Entities.Category;
import io.swagger.annotations.Api;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Api
@CrossOrigin
@RestResource
public interface CategoryRepository extends JpaRepository<Category,Long>{
    List<Category> findCategoryByParentCategory(Category cat) ;
}
