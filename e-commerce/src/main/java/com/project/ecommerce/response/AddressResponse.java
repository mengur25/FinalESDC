package com.project.ecommerce.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressResponse {
    private Long id;
    private String address;
    private String city;
    private String locality;
    private String ward;
    private String pinCode;
    private String mobile;
    private boolean selected;
    private String name;
}

