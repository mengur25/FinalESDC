package com.project.ecommerce.service.impl;

import com.project.ecommerce.domain.USER_ROLE;

import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.SellerRepository;
import com.project.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class CustomUserServiceImpl implements UserDetailsService {

    private static final String SELLER_PREFIX = "seller_";
    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;

    @Autowired
    public CustomUserServiceImpl(UserRepository userRepository, SellerRepository sellerRepository) {
        this.userRepository = userRepository;
        this.sellerRepository = sellerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Loại bỏ tiền tố nếu có
        if (username.startsWith("seller_+")) {
            username = username.substring("seller_+".length());
        }

        // Tìm trong bảng Seller
        Seller seller = sellerRepository.findByEmail(username);
        if (seller != null) {
            return new org.springframework.security.core.userdetails.User(
                    username, seller.getPassword(), Collections.singletonList(new SimpleGrantedAuthority(seller.getRole().name()))
            );
        }

        // Tìm trong bảng User
        User user = userRepository.findByEmail(username);
        if (user != null) {
            return new org.springframework.security.core.userdetails.User(
                    username, user.getPassword(), Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()))
            );
        }

        throw new UsernameNotFoundException("User or Seller not found with email: " + username);
    }

    private UserDetails buildUserDetails(String email, String password, USER_ROLE role) {
        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (password == null || password.isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }
        if (role == null) {
            role = USER_ROLE.ROLE_CUSTOMER;
        }
        List<SimpleGrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(role.name())); // Use role.name() directly
        return new org.springframework.security.core.userdetails.User(email, password, authorityList);
    }
}