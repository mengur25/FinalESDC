package com.project.ecommerce.service.impl;

import com.project.ecommerce.domain.PaymentOrderStatus;
import com.project.ecommerce.domain.PaymentStatus;
import com.project.ecommerce.model.Order;
import com.project.ecommerce.model.PaymentOrder;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.OrderRepository;
import com.project.ecommerce.repository.PaymentOrderRepository;
import com.project.ecommerce.service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentOrderRepository paymentOrderRepository;
    private final OrderRepository orderRepository;

    private String apiKey = "apiKey";
    private String apiSecret = "apiSecret";
    private String stripeSecretKey = "stripeSecretKey";

    @Override
    public PaymentOrder createOrder(User user, Set<Order> orders) {
        Long amount = orders.stream().mapToLong(Order::getTotalSellingPrice).sum();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setUser(user);
        paymentOrder.setOrders(orders);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long orderId) throws Exception {
        return paymentOrderRepository.findById(orderId).orElseThrow(()
                -> new Exception("Payment order not found"));
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String orderId) throws Exception {
        PaymentOrder paymentOrder = paymentOrderRepository.findByPaymentLinkId(orderId);
        if (paymentOrder == null) {
            throw new Exception("Payment order not found with this payment link id");
        }
        return paymentOrder;
    }

    @Override
    public Boolean ProceedPaymentOrder(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException {
        if (paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING)) {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecret);

            Payment payment = razorpay.payments.fetch(paymentId);
            String status = payment.get("status");
            if (status.equals("captured")) {
                Set<Order> orders = paymentOrder.getOrders();
                for (Order order : orders) {
                    order.setPaymentStatus(PaymentStatus.COMPLETED);
                    orderRepository.save(order);
                }
                paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                return true;
            }
            paymentOrder.setStatus(PaymentOrderStatus.FAILED);
            paymentOrderRepository.save(paymentOrder);
            return false;
        }
        return false;
    }

    @Override
    public PaymentLink createRazorpayPaymentLink(User user, Long amount, Long orderId) throws RazorpayException {

        JSONObject mockJson = new JSONObject();
        mockJson.put("short_url", "http://localhost:3000/payment-success?payment_id=mock_razorpay_success&payment_link_id=" + orderId);
        mockJson.put("id", "mock_pl_id_" + orderId);

        return new PaymentLink(mockJson);
    }

    @Override
    public String createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException {

        return "http://localhost:3000/payment-success?payment_id=mock_stripe_success&payment_link_id=" + orderId;
    }
}
