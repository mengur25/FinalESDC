package com.project.ecommerce.controllers;

import com.project.ecommerce.model.*;
import com.project.ecommerce.response.ApiResponse;
import com.project.ecommerce.response.PaymentLinkResponse;
import com.project.ecommerce.service.PaymentService;
import com.project.ecommerce.service.SellerReportService;
import com.project.ecommerce.service.SellerService;
import com.project.ecommerce.service.UserService;
import com.project.ecommerce.service.impl.TransactionService;
import jakarta.transaction.Transactional; // Import cho Transaction Scope
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
public class PaymentController {

    private final UserService userService;
    private final PaymentService paymentService;
    private final SellerService sellerService;
    private final TransactionService transactionService;
    private final SellerReportService sellerReportService;

    // Đảm bảo @Transactional được thêm để bao bọc Transaction, giúp Rollback khi có lỗi.
    // LƯU Ý: Nếu phương thức này được gọi bởi một @Transactional method khác, không cần thêm lại.
    // Nếu nó là điểm entry, hãy thêm nó. Tôi thêm vào đây để an toàn.
    @GetMapping("/{paymentId}")
    @Transactional
    public ResponseEntity<ApiResponse> paymentSuccessHandler(
            @PathVariable String paymentId,
            @RequestParam String paymentLinkId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        PaymentLinkResponse paymentResponse;
        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
        boolean paymentSuccess = paymentService.ProceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

        if(paymentSuccess){
            for (Order order: paymentOrder.getOrders()){
                // 1. TẠO TRANSACTION (Thành công tạm thời)
                transactionService.createTransaction(order);

                // 2. TÌM KIẾM VÀ CẬP NHẬT REPORT
                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport report = sellerReportService.getSellerReport(seller);

                // Lấy số lượng item an toàn (Tránh NullPointerException khi OrderItems là Lazy/Null)
                int totalItemsSold = 0;
                if (order.getOrderItems() != null) {
                    totalItemsSold = order.getOrderItems().size();
                }

                // Cập nhật Report
                report.setTotalOrders(report.getTotalOrders()+1);
                report.setTotalEarnings(report.getTotalEarnings() + order.getTotalSellingPrice());
                // SỬA LỖI: Dùng biến an toàn để tính TotalSales
                report.setTotalSales(report.getTotalSales() + totalItemsSold);

                sellerReportService.updateSellerReport(report); // Nếu lỗi ở đây, Transaction sẽ Rollback
            }
        }

        ApiResponse res = new ApiResponse();
        res.setMessage("Payment Successful");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}