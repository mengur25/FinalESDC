package com.project.ecommerce.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class CreateProductRequest {
    private String title;
    private String description;
    private int mrpPrice;
    private int sellingPrice;
    private String color;
    private List<String> images;
    @JsonProperty("category")
    private String category;
    private String category2;
    private String category3;
    private String size;


}
