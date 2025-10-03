package com.project.ecommerce.service.impl;

import com.project.ecommerce.config.JwtProvider;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.UserRepository;
import com.project.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        System.out.println("👉 Received JWT raw: " + jwt);
        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user= userRepository.findByEmail(email);
        if(user==null){
            throw new Exception("User not found!");
        }
        return user;
    }
    @Override
    public User findUserByJwtTokenWithAddresses(String jwt) throws Exception {
        // ... (Logic trích xuất email từ JWT)
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return userRepository.findByEmailWithAddresses(email)
                .orElseThrow(() -> new Exception("User not found"));
    }
}
