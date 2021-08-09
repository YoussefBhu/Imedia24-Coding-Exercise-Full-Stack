package com.imedia24.ecommerce.demo.Controllers;

import com.imedia24.ecommerce.demo.Dto.AddProduct;
import com.imedia24.ecommerce.demo.Entities.Category;
import com.imedia24.ecommerce.demo.Entities.Product;
import com.imedia24.ecommerce.demo.Repositories.CategoryRepository;
import com.imedia24.ecommerce.demo.Repositories.ProductRepository;
import com.imedia24.ecommerce.demo.Swagger.SpringFoxConfig;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Api(tags = {SpringFoxConfig.Product_TAG})
@RestController
@RequestMapping("api/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private Environment env;

    @ApiOperation(value = "An end point to upload the product image and return the name of the image after saving it in the server" , response = String.class)
    @PostMapping("uploadImage")
    public String addProduct(@RequestParam("image") MultipartFile file) throws Exception {
        String path = env.getProperty("images.upload-directory");
        byte[] bytes = file.getBytes();
        String type = FilenameUtils.getExtension(file.getOriginalFilename());
        String fileName = UUID.randomUUID() + "." + type;
        Path Filepath = Paths.get(path + fileName);
        Files.write(Filepath, bytes);
        return fileName ;
    }

    @ApiOperation(value = "Customized end point to add a product, by receiving a dto 'addProduct' " , response = Product.class)
    @PostMapping
    public Product addProduct(@RequestBody AddProduct addproduct) {
        Product product =  new Product();
        product.setName(addproduct.getName());
        product.setPrice(addproduct.getPrice());
        product.setDescription(addproduct.getDescription());
        product.setImage(addproduct.getImage());
        Set<Category> categories =  new HashSet<>();
        Category currCat =  categoryRepository.getById((Long) addproduct.getCatId());
        while(currCat!=null){
            categories.add(currCat);
            currCat = currCat.getParentCategory();
        }
        product.setCategories(categories);
        return productRepository.save(product);
    }
}
