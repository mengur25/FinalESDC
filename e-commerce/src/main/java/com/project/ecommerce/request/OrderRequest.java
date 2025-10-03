package com.project.ecommerce.request;

import com.project.ecommerce.domain.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private Long addressId;
    private PaymentMethod paymentMethod;
}
