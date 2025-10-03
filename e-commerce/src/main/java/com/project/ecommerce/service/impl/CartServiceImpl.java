package com.project.ecommerce.service.impl;


import com.project.ecommerce.model.Cart;
import com.project.ecommerce.model.CartItem;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.CartItemRepository;
import com.project.ecommerce.repository.CartRepository;
import com.project.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {


    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    @Override
    public CartItem addCartItem(User user, Product product, String size, int quantity) {
        Cart cart = findUserCart(user);

        CartItem isPresent = cartItemRepository.findByCartAndProductAndSize(cart, product, size);

        if(isPresent == null){
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUserId(user.getId());
            cartItem.setSize(size);

            int totalPrice = quantity*product.getSellingPrice();
            cartItem.setSellingPrice(totalPrice);
            cartItem.setMrpPrice(quantity*product.getMrpPrice());


            cart.getCartItems().add(cartItem);
            cartItem.setCart(cart);

            return cartItemRepository.save(cartItem);
        }
        return isPresent;
    }

    @Override
    public Cart findUserCart(User user) {
        // Tìm cart của user
        Cart cart = cartRepository.findByUserId(user.getId());

        // Nếu chưa có thì tạo mới
        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setCartItems(new HashSet<>());
            cart.setTotalMrpPrice(0);
            cart.setTotalSellingPrice(0);
            cart.setDiscount(0);
            cart.setTotalItem(0);
            cart = cartRepository.save(cart);
        }

        // Tính toán tổng
        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getMrpPrice();
            totalDiscountedPrice += cartItem.getSellingPrice();
            totalItem += cartItem.getQuantity();
        }

        // Gán lại giá trị
        cart.setTotalMrpPrice(totalPrice);
        cart.setTotalSellingPrice(totalDiscountedPrice);
        cart.setDiscount(calculateDiscountPercentage(totalPrice, totalDiscountedPrice));
        cart.setTotalItem(totalItem);

        return cart;
    }


    private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
        if (mrpPrice < 0 || sellingPrice < 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
        double discount = mrpPrice - sellingPrice;
        double discountPercentage = (discount / mrpPrice) * 100;
        return (int) discountPercentage;
    }
}
