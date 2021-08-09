package com.imedia24.ecommerce.demo.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;


import javax.persistence.*;
import java.util.Set;

@Entity
@Data
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    @Column(nullable = false)
    private String name ;
    private double price ;  //IN EUR
    private String description;
    private String Image;

    // since it was stated that "Getting the full category path for the products might be a future requirement"
    // i used the many to many relationship between the products and their categories to have the ability to
    // get the full path of the product in case we need it
    @ManyToMany
    @JoinTable(name= "product_category",
            joinColumns =@JoinColumn(name = "product_id" ),
            inverseJoinColumns = @JoinColumn(name = "category_id"))
    @JsonBackReference
    private Set<Category> categories;
}
