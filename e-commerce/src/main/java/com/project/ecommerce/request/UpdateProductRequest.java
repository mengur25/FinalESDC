package com.project.ecommerce.request;

import com.project.ecommerce.model.Category;
import lombok.Data;

import java.util.List;

@Data
public class UpdateProductRequest {
    private String title;
    private String description;
    private int mrpPrice;
    private int sellingPrice;
    private String color;
    private int quantity;
    private List<String> images;
    private Category category;
    private Category category2;
    private Category category3;
    private String size;
}

