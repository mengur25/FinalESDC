package com.project.ecommerce.request;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String fullName;
    private String password;
    private String mobile;
    private String otp;
}
