package com.project.ecommerce.service.impl;

import com.project.ecommerce.exceptions.ProductException;
import com.project.ecommerce.model.Category;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.model.Review;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.repository.CategoryRepository;
import com.project.ecommerce.repository.ProductRepository;
import com.project.ecommerce.request.CreateProductRequest;
import com.project.ecommerce.request.UpdateProductRequest;
import com.project.ecommerce.service.ProductService;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    public Product createProduct(CreateProductRequest req, Seller seller) {

        Category category1 = categoryRepository.findByCategoryId(req.getCategory());

        if (category1 == null) {
            Category category = new Category();
            category.setCategoryId(req.getCategory());
            category.setLevel(1);
            category1 = categoryRepository.save(category);
        }

        Category category2 = null;
        if (req.getCategory2() != null && !req.getCategory2().trim().isEmpty()) {
            category2 = categoryRepository.findByCategoryId(req.getCategory2());
            if (category2 == null) {
                Category category = new Category();
                category.setCategoryId(req.getCategory2());
                category.setLevel(2);
                category.setParentCategory(category1);
                category2 = categoryRepository.save(category);
            }
        }

        Category category3 = null;
        if (req.getCategory3() != null && !req.getCategory3().trim().isEmpty()) {
            category3 = categoryRepository.findByCategoryId(req.getCategory3());
            if (category3 == null) {
                Category category = new Category();
                category.setCategoryId(req.getCategory3());
                category.setLevel(3);
                category.setParentCategory(category2);
                category3 = categoryRepository.save(category);
            }
        }

        int discountPercentage = calculateDiscountPercentage(req.getMrpPrice(), req.getSellingPrice());

        Product product = new Product();
        product.setSeller(seller);
        product.setCategory(category3);
        product.setDescription(req.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setTitle(req.getTitle());
        product.setColor(req.getColor());
        product.setQuantity(req.getQuantity());
        product.setSellingPrice(req.getSellingPrice());
        product.setImages(req.getImages());
        product.setMrpPrice(req.getMrpPrice());
        product.setSizes(req.getSize());
        product.setDiscountPercent(discountPercentage);

        return productRepository.save(product);
    }

    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice <= 0 || sellingPrice <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }

    @Override
    public void deleteProduct(Long productId) {
        Product product = findProductById(productId);
        productRepository.delete(product);
    }

    @Override
    public Product updateProduct(Long productId, UpdateProductRequest request) {
        Product existingProduct = findProductById(productId);

        if (request.getTitle() != null) existingProduct.setTitle(request.getTitle());
        if (request.getDescription() != null) existingProduct.setDescription(request.getDescription());
        if (request.getColor() != null) existingProduct.setColor(request.getColor());
        if (request.getQuantity() != 0) existingProduct.setQuantity(request.getQuantity());
        if (request.getCategory3() != null) existingProduct.setCategory(request.getCategory3());
        if (request.getSellingPrice() != 0) existingProduct.setSellingPrice(request.getSellingPrice());
        if (request.getMrpPrice() != 0) existingProduct.setMrpPrice(request.getMrpPrice());
        if (request.getSize() != null) existingProduct.setSizes(request.getSize());
        if (request.getImages() != null && !request.getImages().isEmpty()) {
            existingProduct.setImages(request.getImages());
        }

        return productRepository.save(existingProduct);
    }

    @Override
    public Product findProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(()->
                new ProductException("Product not found" + productId));
    }

    @Override
    public List<Product> searchProducts(String query) {
        return productRepository.searchProduct(query);
    }

    @Override
    public List<Product> getAllProducts(String category, String brand, String colors, String sizes, Integer minPrice, Integer maxPrice, Integer minDiscount, String sort, String stock, Integer pageNumber) {
        Specification<Product> spec = (root, query, criterialBuilder)->{
            List<Predicate> predicates = new ArrayList<>();

            if(category != null){
                Join<Product, Category> categoryJoin = root.join("category");
                predicates.add(criterialBuilder.equal(categoryJoin.get("categoryId"), category));
            }

            if(colors != null && !colors.isEmpty()){
                predicates.add(criterialBuilder.equal(root.get("color"), colors));
            }
            if(sizes != null && !sizes.isEmpty()){
                predicates.add(criterialBuilder.equal(root.get("size"), sizes));
            }
            if (minPrice != null && minPrice > 0) {
                predicates.add(criterialBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
            }
            if (maxPrice != null && maxPrice > 0) {
                predicates.add(criterialBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }
            if(minDiscount != null  ){
                predicates.add(criterialBuilder.greaterThanOrEqualTo(root.get("discountPercent"), minDiscount));
            }

            if (stock != null && !stock.isEmpty()) {
                if (stock.equalsIgnoreCase("IN_STOCK")) {
                    predicates.add(criterialBuilder.greaterThan(root.get("quantity"), 0));
                } else if (stock.equalsIgnoreCase("OUT_OF_STOCK")) {
                    predicates.add(criterialBuilder.lessThanOrEqualTo(root.get("quantity"), 0));
                }
            }

            return criterialBuilder.and(predicates.toArray(new Predicate[0]));
        };

        Pageable pageable;
        if(sort != null && !sort.isEmpty()){
            pageable = switch (sort){
                case "price_low"-> PageRequest.of(pageNumber!=null ? pageNumber:0, 10, Sort.by("sellingPrice").ascending());
                case "price_high" -> PageRequest.of(pageNumber!=null ? pageNumber:0, 10, Sort.by("sellingPrice").descending());
                default -> PageRequest.of(pageNumber!=null ? pageNumber:0, 10, Sort.unsorted());
            };
        }
        else{
            pageable = PageRequest.of(pageNumber!=null ? pageNumber:0, 10, Sort.unsorted());
        }
        Page<Product> page = productRepository.findAll(spec, pageable);
        return page.getContent();
    }

    @Override
    public List<Product> getProductBySeller(Long sellerId) {
        return productRepository.findBySellerId(sellerId);
    }


    @Override
    public Product updateProductRatingStatistics(Product product) {
        // Lấy danh sách reviews hiện tại của sản phẩm
        List<Review> reviews = product.getReviews();

        // Cập nhật số lượng rating
        int totalRatings = reviews.size();
        product.setNumRatings(totalRatings);

        if (totalRatings > 0) {
            double totalScore = 0;
            for (Review review : reviews) {
                totalScore += review.getRating();
            }

            // Tính rating trung bình
            double averageRating = totalScore / totalRatings;

            // Cập nhật rating trung bình (có thể làm tròn 1 chữ số thập phân)
            int roundedRating =  (int) (Math.round(averageRating * 10.0) / 10.0);
            product.setNumRatings(roundedRating);
        } else {
            // Nếu không có review nào
            product.setNumRatings(0);
        }

        // Lưu sản phẩm đã cập nhật vào database
        return productRepository.save(product);
    }

    @Override
    public void decreaseProductQuantity(Long productId, String size, int quantity) throws Exception {

        Product product = findProductById(productId);

        if (product.getQuantity() < quantity) {
            throw new Exception("Not enough stock for product: " + product.getTitle() + " (ID: " + productId + ")");
        }

        product.setQuantity(product.getQuantity() - quantity);

        productRepository.save(product);
    }

    @Override
    public void increaseProductQuantity(Long productId, String size, int quantity) throws ProductException {
        Product product = findProductById(productId);

        product.setQuantity(product.getQuantity() + quantity);

        productRepository.save(product);
    }

    @Override
    public List<Product> findAllProductsSimple() {
        return productRepository.findAll();
    }
}
