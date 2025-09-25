package com.project.ecommerce.service;

import com.project.ecommerce.domain.USER_ROLE;
import com.project.ecommerce.request.LoginRequest;
import com.project.ecommerce.request.SignupRequest;
import com.project.ecommerce.response.AuthResponse;

public interface AuthService {
    String createUser(SignupRequest req) throws Exception;
    AuthResponse login(LoginRequest req);
    void sentOtp(String email, USER_ROLE role, boolean isRegistration) throws Exception;
}
