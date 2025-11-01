package com.project.ecommerce.controllers;

import com.project.ecommerce.domain.OrderStatus;
import com.project.ecommerce.domain.PaymentMethod;
import com.project.ecommerce.model.*;
import com.project.ecommerce.repository.OrderItemRepository;
import com.project.ecommerce.repository.PaymentOrderRepository;
import com.project.ecommerce.request.OrderRequest;
import com.project.ecommerce.response.PaymentLinkResponse;
import com.project.ecommerce.service.*;
import com.razorpay.PaymentLink;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final UserService userService;
    private final CartService cartService;
    private final OrderService orderService;
    private final SellerService sellerService;
    private final SellerReportService sellerReportService;
    private final OrderItemRepository orderItemRepository;
    private final PaymentService paymentService;
    private final PaymentOrderRepository paymentOrderRepository;
    private final AddressService addressService;

    @PostMapping

    public ResponseEntity<PaymentLinkResponse> createOrder(
            @RequestBody OrderRequest orderRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtTokenWithAddresses(jwt);
        Cart cart = cartService.findUserCart(user);
        Address shippingAddress = addressService.getAddressByIdAndUser(orderRequest.getAddressId(), user);

        PaymentOrder paymentOrder = orderService.createAndSavePaymentOrder(user, shippingAddress, cart);

        PaymentLinkResponse res = new PaymentLinkResponse();

        try {
            if (orderRequest.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {

                PaymentLink payment = paymentService.createRazorpayPaymentLink(
                        user, paymentOrder.getAmount(), paymentOrder.getId()
                );
                String paymentUrl = payment.get("short_url");
                String paymentUrlId = payment.get("id");

                res.setPayment_link_url(paymentUrl);

                paymentOrder.setPaymentLinkId(paymentUrlId);
                paymentOrderRepository.save(paymentOrder);
            } else {
                String paymentUrl = paymentService.createStripePaymentLink(
                        user, paymentOrder.getAmount(), paymentOrder.getId()
                );
                res.setPayment_link_url(paymentUrl);
            }

        } catch (Exception e) {
            throw new Exception("Payment Gateway connection error or invalid configuration. Please check logs.", e);
        }

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> usersOrderHistory(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<Order> orders = orderService.usersOrderHistory(user.getId());
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId,
                                              @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order orders= orderService.findOrderById(orderId);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }
    @GetMapping("/item/{orderItemId}")
    public ResponseEntity<OrderItem> getOrderItemById(
            @PathVariable Long orderItemId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        OrderItem orderItem = orderService.findById(orderItemId);
        return new ResponseEntity<>(orderItem, HttpStatus.ACCEPTED);
    }

    @PutMapping("/{orderId}/delivered")
    public ResponseEntity<Order> markOrderAsDelivered(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.updateOrderStatus(orderId, OrderStatus.DELIVERED);


        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(
            @PathVariable Long orderId,
            @RequestHeader("Authorization") String jwt

    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Order order = orderService.cancelOrder(orderId, user);

        Seller seller = sellerService.getSellerById(order.getSellerId());
        SellerReport report = sellerReportService.getSellerReport(seller);

        report.setCanceledOrders(report.getCanceledOrders()+1);
        report.setTotalRefunds(report.getTotalRefunds() + order.getTotalSellingPrice());
        sellerReportService.updateSellerReport(report);
        return ResponseEntity.ok(order);
    }


}
