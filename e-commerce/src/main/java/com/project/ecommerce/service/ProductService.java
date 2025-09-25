package com.project.ecommerce.service;

import com.project.ecommerce.model.Product;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.request.CreateProductRequest;
import com.project.ecommerce.request.UpdateProductRequest;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;


public interface ProductService {
    public Product createProduct(CreateProductRequest req, Seller seller);
    public void deleteProduct(Long productId);
    public Product updateProduct(Long productId, UpdateProductRequest request);
    Product findProductById(Long productId);
    List<Product> searchProducts(String query);
    public List<Product> getAllProducts(
            String category,
            String brand,
            String colors,
            String sizes,
            Integer minPrice,
            Integer maxPrice,
            Integer minDiscount,
            String sort,
            String stock,
            Integer pageNumber
    );
    List<Product> getProductBySeller(Long sellerId);
}
