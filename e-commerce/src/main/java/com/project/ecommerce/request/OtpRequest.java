package com.project.ecommerce.request;

import com.project.ecommerce.domain.USER_ROLE;
import lombok.Data;

@Data
public class OtpRequest {
    private String email;
    private USER_ROLE role;
    private boolean isRegistration;
}
