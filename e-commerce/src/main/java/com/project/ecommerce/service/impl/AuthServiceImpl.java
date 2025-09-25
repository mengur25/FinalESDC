package com.project.ecommerce.service.impl;

import com.project.ecommerce.config.JwtProvider;
import com.project.ecommerce.domain.USER_ROLE;
import com.project.ecommerce.model.Cart;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.User;
import com.project.ecommerce.model.VerificationCode;
import com.project.ecommerce.repository.CartRepository;
import com.project.ecommerce.repository.SellerRepository;
import com.project.ecommerce.repository.UserRepository;
import com.project.ecommerce.repository.VerificationCodeRepository;
import com.project.ecommerce.request.LoginRequest;
import com.project.ecommerce.request.SignupRequest;
import com.project.ecommerce.response.AuthResponse;
import com.project.ecommerce.service.AuthService;
import com.project.ecommerce.service.EmailService;
import com.project.ecommerce.utils.OtpUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final EmailService emailService;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final VerificationCodeRepository verificationCodeRepository;
    private final SellerRepository sellerRepository;
    private final CustomUserServiceImpl customerUserService;

    @Override
    public String createUser(SignupRequest req) throws Exception {
        VerificationCode verificationCode = verificationCodeRepository.findByEmail(req.getEmail());
        if(verificationCode == null || !verificationCode.getOtp().equals(req.getOtp())){
            throw new Exception("Wrong otp");
        }
        User user = userRepository.findByEmail(req.getEmail());


        if(user == null){
            User createUser = new User();
            createUser.setFullName(req.getFullName());
            createUser.setEmail(req.getEmail());
            createUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createUser.setMobile(req.getMobile());
            createUser.setPassword(passwordEncoder.encode(req.getPassword()));
            user = userRepository.save(createUser);

            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }else{
            throw new Exception("User already exists!");
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString()));
        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Transactional
    public void sentOtp(String email, USER_ROLE role, boolean isRegistration) throws Exception {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }

        String SIGNING_PREFIX = "signin_";
        boolean isSignIn = email.startsWith(SIGNING_PREFIX);
        if (isSignIn) {
            email = email.substring(SIGNING_PREFIX.length());
            User user = userRepository.findByEmail(email);
            Seller seller = sellerRepository.findByEmail(email);
            if (user == null && seller == null) {
                throw new Exception("User or Seller not found for email: " + email);
            }
            if (user != null && role.equals(USER_ROLE.ROLE_SELLER)) {
                throw new Exception("Email is registered as a User, not a Seller");
            }
            if (seller != null && role.equals(USER_ROLE.ROLE_CUSTOMER)) {
                throw new Exception("Email is registered as a Seller, not a User");
            }
        } else if (!isRegistration) {
            User user = userRepository.findByEmail(email);
            Seller seller = sellerRepository.findByEmail(email);
            if (user == null && seller == null) {
                throw new Exception("User or Seller not found for email: " + email);
            }
        }

        // Xóa tất cả OTP cũ cho email này
        int deletedCount = verificationCodeRepository.deleteByEmail(email);
        System.out.println("Deleted " + deletedCount + " old OTP records for email: " + email);

        String otp = OtpUtil.generateOtp();
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        String subject = "Verify your e-commerce account with email " + email;
        String text = "Your OTP is: " + otp;
        try {
            emailService.sendVerificationOtpEmail(email, otp, subject, text);
        } catch (Exception e) {
            throw new Exception("Failed to send verification email: " + e.getMessage());
        }
    }

    public AuthResponse login(LoginRequest req) {
        AuthResponse response = new AuthResponse();

        // Kiểm tra đầu vào
        if (req == null || req.getEmail() == null || req.getEmail().trim().isEmpty() ||
                req.getPassword() == null || req.getPassword().trim().isEmpty()) {
            response.setMessage("Email and password are required");
            return response;
        }

        String username = req.getEmail();
        String password = req.getPassword();

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

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails = customerUserService.loadUserByUsername(username);

        if (userDetails == null || userDetails.getPassword() == null ||
                !passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password!");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }

    private USER_ROLE safeValueOf(String roleName) {
        try {
            return USER_ROLE.valueOf(roleName);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
