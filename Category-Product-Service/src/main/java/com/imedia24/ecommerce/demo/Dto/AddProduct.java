package com.imedia24.ecommerce.demo.Dto;

import lombok.Data;

@Data
public class AddProduct {
    private String name ;
    private double price ;
    private String description ;
    private String image;
    private long catId ;
}
