package com.project.ecommerce.controllers;

import com.project.ecommerce.config.JwtProvider;
import com.project.ecommerce.domain.USER_ROLE;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.UserRepository;
import com.project.ecommerce.request.LoginRequest;
import com.project.ecommerce.request.OtpRequest;
import com.project.ecommerce.request.SignupRequest;
import com.project.ecommerce.response.ApiResponse;
import com.project.ecommerce.response.AuthResponse;
import com.project.ecommerce.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    public final AuthService authService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {

        AuthResponse res = new AuthResponse();
        if (req == null || req.getEmail() == null || req.getEmail().trim().isEmpty() ||
                req.getPassword() == null || req.getPassword().trim().isEmpty()
                || req.getMobile() == null || req.getMobile().trim().isEmpty()
                || req.getFullName() == null || req.getFullName().trim().isEmpty()) {
            res.setMessage("All fields are required");
            return ResponseEntity.badRequest().body(res);
        }
        String jwt = authService.createUser(req);
        res.setJwt(jwt);
        res.setMessage("Register Successfully");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/otp")
    public ResponseEntity<ApiResponse> sentOtpHandler(@RequestBody OtpRequest req) {
        ApiResponse res = new ApiResponse();
        try {
            authService.sentOtp(req.getEmail(), req.getRole(), true);
            res.setMessage("OTP sent successfully!");
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            res.setMessage("Failed to send OTP: " + e.getMessage());
            return ResponseEntity.badRequest().body(res);
        }
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest req) {
        AuthResponse response = new AuthResponse();


        String username = req.getEmail();
        String password = req.getPassword();

        if (req.getEmail() == null || req.getEmail().trim().isEmpty() ||
                req.getPassword() == null || req.getPassword().trim().isEmpty()) {
            response.setMessage("Email and password are required");
            return response;
        }
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtProvider.generateToken(authentication);
            response.setJwt(token);
            response.setMessage("Login successful");

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            String roleName = authorities.isEmpty() ? null : authorities.iterator().next().getAuthority();
            response.setRole(roleName != null ? safeValueOf(roleName) : null);

        } catch (AuthenticationException e) {
            response.setMessage("Login failed: " + e.getMessage());
            response.setJwt(null);
            response.setRole(null);
        } catch (Exception e) {
            response.setMessage("Login failed: An unexpected error occurred - " + e.getMessage());
            response.setJwt(null);
            response.setRole(null);
        }

        return response;
    }

    private USER_ROLE safeValueOf(String roleName) {
        try {
            return USER_ROLE.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
