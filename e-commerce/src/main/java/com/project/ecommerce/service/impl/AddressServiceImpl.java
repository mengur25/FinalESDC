package com.project.ecommerce.service.impl;

import com.project.ecommerce.model.Address;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.AddressRepository;
import com.project.ecommerce.request.AddressRequest;
import com.project.ecommerce.response.AddressResponse;
import com.project.ecommerce.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public Address saveAddress(User user, Address address) {
        address.setId(null);
        address.setUser(user);
        return addressRepository.save(address);
    }


    @Override
    public List<AddressResponse> getUserAddresses(User user) {
        return addressRepository.findByUser(user)
                .stream()
                .map(addr -> {
                    AddressResponse res = new AddressResponse();
                    res.setId(addr.getId());
                    res.setAddress(addr.getAddress());
                    res.setCity(addr.getCity());
                    res.setLocality(addr.getLocality());
                    res.setWard(addr.getWard());
                    res.setPinCode(addr.getPinCode());
                    res.setMobile(addr.getMobile());
                    res.setSelected(addr.isSelected());
                    res.setName(addr.getName());
                    return res;
                })
                .toList();
    }

    @Override
    public Address getAddressByIdAndUser(Long id, User user) throws Exception {
        return addressRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new Exception("Address not found or not authorized"));
    }

    @Override
    public void deleteAddress(Long id, User user) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to delete this address");
        }
        addressRepository.delete(address);
    }

    @Override
    public Address setSelectedAddress(Long id, User user) {
        List<Address> userAddresses = addressRepository.findByUser(user);
        for (Address addr : userAddresses) {
            addr.setSelected(false);
        }
        addressRepository.saveAll(userAddresses);

        Address selected = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!selected.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized");
        }
        selected.setSelected(true);
        return addressRepository.save(selected);
    }

    @Override
    public AddressResponse updateAddress(User user, Long id, AddressRequest request) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to update this address");
        }

        // update field
        address.setName(request.getName());
        address.setAddress(request.getAddress());
        address.setCity(request.getCity());
        address.setLocality(request.getLocality());
        address.setWard(request.getWard());
        address.setPinCode(request.getPinCode());
        address.setMobile(request.getMobile());

        // xử lý selected
        if (request.isSelected()) {
            List<Address> userAddresses = addressRepository.findByUser(user);
            for (Address addr : userAddresses) {
                addr.setSelected(false);
            }
            addressRepository.saveAll(userAddresses);
            address.setSelected(true);
        } else {
            address.setSelected(false);
        }

        Address updated = addressRepository.save(address);

        // map sang response DTO
        AddressResponse res = new AddressResponse();
        res.setId(updated.getId());
        res.setName(updated.getName());
        res.setAddress(updated.getAddress());
        res.setCity(updated.getCity());
        res.setLocality(updated.getLocality());
        res.setWard(updated.getWard());
        res.setPinCode(updated.getPinCode());
        res.setMobile(updated.getMobile());
        res.setSelected(updated.isSelected());

        return res;
    }

    @Override
    public boolean addressExistsInUserAddresses(Long addressId, Long userId) {
        return addressRepository.existsByIdAndUserId(addressId, userId);
    }
}

