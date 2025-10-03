package com.project.ecommerce.controllers;

import com.project.ecommerce.model.Address;
import com.project.ecommerce.model.User;
import com.project.ecommerce.request.AddressRequest;
import com.project.ecommerce.response.AddressResponse;
import com.project.ecommerce.service.AddressService;
import com.project.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/addresses")
public class AddressController {

    private final AddressService addressService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Address> addAddress(
            @RequestBody AddressRequest request,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        // lấy user từ JWT
        User user = userService.findUserByJwtToken(jwt);

        // tạo entity mới từ request
        Address address = new Address();
        address.setName(request.getName());
        address.setCity(request.getCity());
        address.setWard(request.getWard());
        address.setLocality(request.getLocality());
        address.setMobile(request.getMobile());
        address.setPinCode(request.getPinCode());
        address.setAddress(request.getAddress());
        address.setUser(user);  // gán user

        Address saved = addressService.saveAddress(user, address);

        return ResponseEntity.ok(saved);
    }


    @GetMapping
    public ResponseEntity<List<AddressResponse>> getUserAddresses(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        List<AddressResponse> addresses = addressService.getUserAddresses(user);
        return ResponseEntity.ok(addresses);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        addressService.deleteAddress(id, user);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/select")
    public ResponseEntity<Address> selectAddress(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);
        Address updated = addressService.setSelectedAddress(id, user);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponse> updateAddress(
            @PathVariable Long id,
            @RequestBody AddressRequest request,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        User user = userService.findUserByJwtToken(jwt);

        // gọi service update
        AddressResponse updated = addressService.updateAddress(user, id, request);

        return ResponseEntity.ok(updated);
    }


}

