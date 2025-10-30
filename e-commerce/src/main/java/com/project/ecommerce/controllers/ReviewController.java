package com.project.ecommerce.controllers;


import com.project.ecommerce.model.Product;
import com.project.ecommerce.model.Review;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.CreateReviewRequest;
import com.project.ecommerce.response.ApiResponse;
import com.project.ecommerce.service.ProductService;
import com.project.ecommerce.service.ReviewService;
import com.project.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;
    private final ProductService productService;

    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<Review>> getReviewsByProductId(
            @PathVariable Long productId
    ){
        List<Review> reviews = reviewService.getReviewByProductId(productId);
        return ResponseEntity.ok(reviews);
    }

    @PostMapping("/products/{productId}/reviews")
    public ResponseEntity<Review> writeReview(
            @RequestBody CreateReviewRequest req,
            @PathVariable Long productId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Product product = productService.findProductById(productId);

        // Chức năng createReview sẽ tự động gọi updateProductRatingStatistics bên trong Service
        Review review = reviewService.createReview(
                req, user, product
        );

        return ResponseEntity.ok(review);
    }

    @PatchMapping("/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(
            @RequestBody CreateReviewRequest req,
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        // Giả định bạn đã đổi tên các getter trong CreateReviewRequest thành getReview() và getRating()
        // để đồng bộ với frontend (nếu không, hãy giữ nguyên getReviewText/getReviewRating)
        Review review = reviewService.updateReview(
                reviewId,
                req.getReviewText(),    // Đã thay đổi từ getReviewText()
                req.getReviewRating(),    // Đã thay đổi từ getReviewRating()
                user.getId()
        );

        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<ApiResponse> deleteReview(
            @PathVariable Long reviewId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        // Việc gọi deleteReview sẽ kích hoạt logic cập nhật rating trong ReviewServiceImpl
        reviewService.deleteReview(reviewId, user.getId());

        ApiResponse res = new ApiResponse();
        res.setMessage("Review Deleted");

        return ResponseEntity.ok(res);
    }
}