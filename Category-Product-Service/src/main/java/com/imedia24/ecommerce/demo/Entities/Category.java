package com.imedia24.ecommerce.demo.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;


import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id ;
    @Column(unique = true , nullable = false)
    private String name ;
    @ManyToOne
    @JsonBackReference
    private Category parentCategory;
    @OneToMany(cascade = {CascadeType.REMOVE } ,
            fetch = FetchType.LAZY, mappedBy = "parentCategory")
    @OrderBy("name asc ")
   //@JsonManagedReference
    private List<Category> subCategories ;
    @ManyToMany(cascade = { CascadeType.REMOVE},
            fetch = FetchType.EAGER , mappedBy = "categories")
    @OrderBy("name")
    @JsonIgnore
    private List<Product> products ;
}
