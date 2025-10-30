package com.project.ecommerce.service.impl;

import com.project.ecommerce.model.Cart;
import com.project.ecommerce.model.Coupon;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.CartRepository;
import com.project.ecommerce.repository.CouponRepository;
import com.project.ecommerce.repository.UserRepository;
import com.project.ecommerce.service.CartService;
import com.project.ecommerce.service.CouponService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {
    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    private double calculateInitialSellingPrice(Cart cart) {
        return cart.getCartItems().stream()
                .mapToDouble(item -> item.getSellingPrice())
                .sum();
    }

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);
        Cart cart = cartService.findUserCart(user);

        if (coupon == null) {
            throw new Exception("Coupon not valid");
        }
        if (user.getUsedCoupons().contains(coupon)) {
            throw new Exception("Coupon already used");
        }
        if (orderValue < coupon.getMinimumOrderValue()) {
            throw new Exception("Order value is lower than coupon price " + coupon.getMinimumOrderValue());
        }

        double initialSellingPrice = calculateInitialSellingPrice(cart);
        cart.setTotalSellingPrice((int) initialSellingPrice);
        cart.setCouponCode(null);
        LocalDate today = LocalDate.now();

        if (coupon.isActive() &&
                !today.isBefore(coupon.getValidityStartDate())
                &&
                !today.isAfter(coupon.getValidityEndDate())) {

            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            double discountedAmount = (initialSellingPrice * coupon.getDiscountPercentage()) / 100;
            cart.setTotalSellingPrice((int) (initialSellingPrice - discountedAmount));
            cart.setCouponCode(code);

            return cartRepository.save(cart);
        }
        throw new Exception("Coupon not valid");
    }
    @Override
    public Cart removeCoupon(String code, User user) throws Exception {
        Cart cart = cartService.findUserCart(user);

        if (cart.getCouponCode() == null || !cart.getCouponCode().equals(code)) {
            throw new Exception("Coupon not currently applied");
        }

        double initialSellingPrice = calculateInitialSellingPrice(cart);
        cart.setTotalSellingPrice((int) initialSellingPrice);
        cart.setCouponCode(null);


        return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return couponRepository.findById(id).orElseThrow(()
                -> new Exception("Coupon not found"));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Override
    public List<Coupon> findAllCoupons() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}
