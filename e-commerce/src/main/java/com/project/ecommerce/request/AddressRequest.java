package com.project.ecommerce.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressRequest {
    private String name;
    private String locality;
    private String address;
    private String city;
    private String ward;
    private String pinCode;
    private String mobile;
    private boolean selected;
}

