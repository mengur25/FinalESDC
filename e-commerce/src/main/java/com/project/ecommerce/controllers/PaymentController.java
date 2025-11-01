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

    @GetMapping("/{paymentId}")
    @Transactional
    public ResponseEntity<ApiResponse> paymentSuccessHandler(
            @PathVariable String paymentId,
            @RequestParam String paymentLinkId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        PaymentOrder paymentOrder = paymentService.getPaymentOrderByPaymentId(paymentLinkId);
        boolean paymentSuccess = paymentService.ProceedPaymentOrder(paymentOrder, paymentId, paymentLinkId);

        if(paymentSuccess){
            for (Order order: paymentOrder.getOrders()){
                transactionService.createTransaction(order);

                Seller seller = sellerService.getSellerById(order.getSellerId());
                SellerReport report = sellerReportService.getSellerReport(seller);

                // **[SỬA LỖI LOGIC]**: Tính tổng quantity đã bán (TotalSales)
                long totalQuantitySold = 0;
                if (order.getOrderItems() != null) {
                    totalQuantitySold = order.getOrderItems().stream()
                            .mapToLong(OrderItem::getQuantity)
                            .sum();
                }

                report.setTotalOrders(report.getTotalOrders()+1);
                report.setTotalEarnings(report.getTotalEarnings() + order.getTotalSellingPrice());
                report.setTotalSales(report.getTotalSales() + (int) totalQuantitySold);

                sellerReportService.updateSellerReport(report);
            }
        }

        ApiResponse res = new ApiResponse();
        res.setMessage("Payment Successful");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }
}