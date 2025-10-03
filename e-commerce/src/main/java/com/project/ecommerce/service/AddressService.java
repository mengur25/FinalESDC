package com.project.ecommerce.service;

import com.project.ecommerce.model.Address;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.AddressRequest;
import com.project.ecommerce.response.AddressResponse;

import java.util.List;

public interface AddressService {
    Address saveAddress(User user, Address address);
    List<AddressResponse> getUserAddresses(User user);
    void deleteAddress(Long id, User user);
    Address setSelectedAddress(Long id, User user);
    AddressResponse updateAddress(User user, Long id, AddressRequest request);
    Address getAddressByIdAndUser(Long id, User user) throws Exception;
    boolean addressExistsInUserAddresses(Long addressId, Long userId);
}
