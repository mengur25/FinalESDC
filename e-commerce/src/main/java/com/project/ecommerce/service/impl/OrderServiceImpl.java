package com.project.ecommerce.service.impl;

import com.project.ecommerce.domain.OrderStatus;
import com.project.ecommerce.domain.PaymentStatus;
import com.project.ecommerce.model.*;
import com.project.ecommerce.repository.*;
import com.project.ecommerce.service.AddressService;
import com.project.ecommerce.service.OrderService;
import com.project.ecommerce.service.PaymentService;
import com.project.ecommerce.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final AddressRepository addressRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final AddressService addressService;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final PaymentService paymentService;
    private  final  PaymentOrderRepository paymentOrderRepository;
    private final ProductService productService;

    @Override
    @Transactional
    public Set<Order> createOrder(User user, Address shippingAddress, Cart cart) throws Exception {


        Address savedAddress = addressRepository.save(shippingAddress);


        boolean addressExistsForUser = addressService.addressExistsInUserAddresses(savedAddress.getId(), user.getId());

        if (!addressExistsForUser) {

            user.getAddresses().add(savedAddress);

        }

        Address finalShippingAddress = savedAddress;

        Map<Long, List<CartItem>> itemsBySeller= cart.getCartItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct()
                        .getSeller().getId()));

        Set<Order> orders = new HashSet<>();
        List<CartItem> purchasedCartItems = new ArrayList<>();

        for(Map.Entry<Long, List<CartItem>> entry: itemsBySeller.entrySet()){
            Long sellerId = entry.getKey();
            List<CartItem> items = entry.getValue();

            int totalOrderPrice = items.stream().mapToInt(
                    CartItem::getSellingPrice
            ).sum();

            int totalMrpPrice = items.stream().mapToInt(
                    CartItem::getMrpPrice
            ).sum();

            int totalItem = items.stream().mapToInt(CartItem::getQuantity).sum();

            Order createdOrder = new Order();
            createdOrder.setUser(user);
            createdOrder.setSellerId(sellerId);

            createdOrder.setTotalMrpPrice(totalMrpPrice);
            createdOrder.setTotalSellingPrice(totalOrderPrice);

            createdOrder.setTotalItem(totalItem);
            createdOrder.setShippingAddress(finalShippingAddress);

            createdOrder.setOrderStatus(OrderStatus.PENDING);
            createdOrder.getPaymentDetails().setStatus(PaymentStatus.PENDING);

            Order savedOrder = orderRepository.save(createdOrder);
            orders.add(savedOrder);


            List<OrderItem> orderItems = new ArrayList<>();
            for(CartItem item: items){
                productService.decreaseProductQuantity(
                        item.getProduct().getId(),
                        item.getSize(),
                        item.getQuantity()
                );

                OrderItem orderItem = new OrderItem();
                orderItem.setOrder(savedOrder);
                orderItem.setMrpPrice(item.getMrpPrice());
                orderItem.setProduct(item.getProduct());
                orderItem.setQuantity(item.getQuantity());
                orderItem.setSize(item.getSize());
                orderItem.setUserId(item.getUserId());
                orderItem.setSellingPrice(item.getSellingPrice());

                savedOrder.getOrderItems().add(orderItem);

                OrderItem savedOrderItem= orderItemRepository.save(orderItem);
                orderItems.add(savedOrderItem);
                purchasedCartItems.add(item);

            }
        }

        cart.getCartItems().removeAll(purchasedCartItems);
        cartRepository.save(cart);
        if (!purchasedCartItems.isEmpty()) {
            cartItemRepository.deleteAll(purchasedCartItems);
        }
        return orders;
    }


    @Override
    public Order findOrderById(Long id) throws Exception {
        return orderRepository.findById(id).orElseThrow(()
        -> new Exception("Order not found"));
    }

    @Override
    public List<Order> usersOrderHistory(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public List<Order> sellersOrder(Long sellerId) {
        return orderRepository.findBySellerIdWithUser(sellerId);
    }

    @Override
    public Order updateOrderStatus(Long orderId, OrderStatus orderStatus) throws Exception {
        Order order = findOrderById(orderId);
        order.setOrderStatus(orderStatus);
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId, User user) throws Exception {
        Order order = findOrderById(orderId);
        if(!user.getId().equals(order.getUser().getId())){
            throw new Exception("You do not have permission to cancel this order ");
        }
        if (order.getOrderStatus() != OrderStatus.CANCELLED && order.getOrderStatus() != OrderStatus.DELIVERED) {
            for (OrderItem item : order.getOrderItems()) {
                productService.increaseProductQuantity(
                        item.getProduct().getId(),
                        item.getSize(),
                        item.getQuantity()
                );
            }
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        return orderRepository.save(order);
    }

    @Override
    public OrderItem findById(Long id) throws Exception {
        return orderItemRepository.findById(id).orElseThrow(()
        -> new Exception("Order item not exist"));
    }

    @Override
    @Transactional
    public PaymentOrder createAndSavePaymentOrder(User user, Address shippingAddress, Cart cart) throws Exception {

        Set<Order> orders = createOrder(user, shippingAddress, cart);
        PaymentOrder paymentOrder = paymentService.createOrder(user, orders);

        PaymentOrder committedPaymentOrder = paymentOrderRepository.findById(paymentOrder.getId())
                .orElseThrow(() -> new RuntimeException("PaymentOrder commit failed."));

        return committedPaymentOrder;
    }
}
