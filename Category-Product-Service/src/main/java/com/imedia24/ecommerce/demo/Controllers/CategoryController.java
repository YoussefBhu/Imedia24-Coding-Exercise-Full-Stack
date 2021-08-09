package com.imedia24.ecommerce.demo.Controllers;

import com.imedia24.ecommerce.demo.Entities.Category;
import com.imedia24.ecommerce.demo.Repositories.CategoryRepository;
import com.imedia24.ecommerce.demo.Repositories.ProductRepository;
import com.imedia24.ecommerce.demo.Swagger.SpringFoxConfig;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Api(tags = {SpringFoxConfig.Cat_TAG})
@RestController
@RequestMapping("api/categories")
@CrossOrigin
public class CategoryController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @ApiOperation(value = "End point to get structured list of the main categories and their sub categories")
    @GetMapping
    public List<Category> getAllCategories(){
        List<Category> categories = categoryRepository.findCategoryByParentCategory(null);
        return categories;
    }
}
