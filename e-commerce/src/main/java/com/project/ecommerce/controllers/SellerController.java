package com.project.ecommerce.controllers;

import com.project.ecommerce.config.JwtProvider;
import com.project.ecommerce.domain.AccountStatus;
import com.project.ecommerce.domain.USER_ROLE;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.SellerReport;
import com.project.ecommerce.model.VerificationCode;
import com.project.ecommerce.repository.VerificationCodeRepository;
import com.project.ecommerce.request.LoginRequest;
import com.project.ecommerce.response.ApiResponse;
import com.project.ecommerce.response.AuthResponse;
import com.project.ecommerce.service.EmailService;
import com.project.ecommerce.service.SellerReportService;
import com.project.ecommerce.service.SellerService;
import com.project.ecommerce.utils.OtpUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sellers")
public class SellerController {

    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final SellerService sellerService;
    private final EmailService emailService;
    private final VerificationCodeRepository verificationCodeRepository;
    private final SellerReportService sellerReportService;

    @PostMapping
    @Transactional
    public ResponseEntity<ApiResponse> createSeller(@RequestBody Seller seller) {
        ApiResponse response = new ApiResponse();
        try {
            if (seller.getEmail() == null || seller.getEmail().trim().isEmpty()) {
                response.setMessage("Email cannot be null or empty");
                return ResponseEntity.badRequest().body(response);
            }


            Seller savedSeller = sellerService.createSeller(seller);

            verificationCodeRepository.deleteByEmail(seller.getEmail());

            String otp = OtpUtil.generateOtp();
            VerificationCode verificationCode = new VerificationCode();
            verificationCode.setOtp(otp);
            verificationCode.setEmail(seller.getEmail());
            verificationCodeRepository.save(verificationCode);

            String subject = "Email Verification Code";
            String text = "Welcome to E-commerce Seller, verify your account using this OTP: " + otp;
            emailService.sendVerificationOtpEmail(seller.getEmail(), otp, subject, text);

            response.setMessage("Seller created successfully! OTP sent to " + seller.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            response.setMessage("Failed to create seller: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
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

    @PatchMapping("/verify/{otp}")
    public ResponseEntity<Seller> verifySellerEmail(@PathVariable String otp) throws Exception {
        VerificationCode verificationCode = verificationCodeRepository.findByOtp(otp);

        if(verificationCode == null || !verificationCode.getOtp().equals(otp)){
            throw new Exception("Wrong otp");
        }

        Seller seller = sellerService.verifyEmail(verificationCode.getEmail(), otp);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long id) throws Exception {
        Seller seller = sellerService.getSellerById(id);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<Seller> getSellerProfileByJwt(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);
        Seller seller = sellerService.getSellerByEmail(email);
        return new ResponseEntity<>(seller, HttpStatus.OK);
    }

    @GetMapping("/report")
    public ResponseEntity<SellerReport> getSellerReportByJwt(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);
        SellerReport report = sellerReportService.getSellerReport(seller);

        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Seller>> getAllSellersByAccountStatus(
            @RequestParam(required = false)AccountStatus status
            )
    {
        List<Seller> sellers = sellerService.getAllSeller(status);
        return ResponseEntity.ok(sellers);
    }

    @PatchMapping
    public ResponseEntity<Seller> updateSeller(
            @RequestHeader("Authorization") String jwt,
            @RequestBody Seller seller
    ) throws Exception {
        Seller profile = sellerService.getSellerProfile(jwt);
        Seller updatedSeller = sellerService.updateSeller(profile.getId(), seller);

        return ResponseEntity.ok(updatedSeller);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Seller> deleteSeller(
            @PathVariable Long id
    ) throws Exception {
        sellerService.deleteSeller(id);
        return ResponseEntity.noContent().build();
    }
}
