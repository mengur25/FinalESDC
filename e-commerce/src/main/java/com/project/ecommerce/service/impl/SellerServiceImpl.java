package com.project.ecommerce.service.impl;

import com.project.ecommerce.config.JwtProvider;
import com.project.ecommerce.domain.AccountStatus;
import com.project.ecommerce.domain.USER_ROLE;
import com.project.ecommerce.model.Address;
import com.project.ecommerce.model.BankDetails;
import com.project.ecommerce.model.BusinessDetails;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.repository.AddressRepository;
import com.project.ecommerce.repository.SellerRepository;
import com.project.ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
    private final JwtProvider jwtProvider;
    private final SellerRepository sellerRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Seller getSellerProfile(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromJwtToken(jwt);

        return this.getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) throws Exception {
        if (seller == null || seller.getEmail() == null || seller.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }

        Seller sellerExist = sellerRepository.findByEmail(seller.getEmail());
        if (sellerExist != null) {
            throw new Exception("Seller already exist!");
        }

        if (seller.getPickupAddress() == null) {
            throw new IllegalArgumentException("Pickup address cannot be null");
        }
        Address savedAddress = addressRepository.save(seller.getPickupAddress());

        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGSTIN(seller.getGSTIN());
        if (newSeller.getGSTIN() == null || newSeller.getGSTIN().trim().isEmpty()) {
            throw new IllegalArgumentException("GSTIN cannot be null or empty");
        }
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        newSeller.setAccountStatus(AccountStatus.PENDING_VERIFICATION);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBankDetails(seller.getBankDetails() != null ? seller.getBankDetails() : new BankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails() != null ? seller.getBusinessDetails() : new BusinessDetails());

        if (newSeller.getAccountStatus() == AccountStatus.PENDING_VERIFICATION) {
            newSeller.setEmailVerified(false);
        } else {
            newSeller.setEmailVerified(true);
        }

        return sellerRepository.save(newSeller);
    }

    @Override
    public Seller getSellerById(Long id) throws Exception {
        return sellerRepository.findById(id).orElseThrow(() ->
                new Exception("Seller not found with id"));
    }

    @Override
    public Seller getSellerByEmail(String email) throws Exception {
        Seller seller = sellerRepository.findByEmail(email);
        if (seller == null) {
            throw new Exception("Seller not found!");
        }
        return seller;
    }

    @Override
    public List<Seller> getAllSeller(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public void deleteSeller(Long id) throws Exception {
        Seller seller = getSellerById(id);
        sellerRepository.delete(seller);
    }

    @Override
    public Seller verifyEmail(String email, String otp) throws Exception {
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerified(true);
        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSeller(Long id, Seller seller) throws Exception {
        Seller existingSeller = this.getSellerById(id);

        if (seller.getSellerName() != null) {
            existingSeller.setSellerName(seller.getSellerName());
        }
        if (seller.getMobile() != null) {
            existingSeller.setMobile(seller.getMobile());
        }
        if (seller.getPassword() != null) {
            existingSeller.setPassword(seller.getPassword());
        }
        if (seller.getBusinessDetails() != null && seller.getBusinessDetails().getBusinessName() != null) {
            existingSeller.getBusinessDetails().setBusinessName(
                    seller.getBusinessDetails().getBusinessName()
            );
        }

        if (seller.getBankDetails() != null && seller.getBankDetails().getAccountHolderName() != null
                && seller.getBankDetails().getIfscCode() != null
                && seller.getBankDetails().getAccountNumber() != null) {
            existingSeller.getBankDetails().setAccountHolderName(
                    seller.getBankDetails().getAccountHolderName()
            );
            existingSeller.getBankDetails().setAccountNumber(
                    seller.getBankDetails().getAccountNumber()
            );
            existingSeller.getBankDetails().setIfscCode(
                    seller.getBankDetails().getIfscCode()
            );
        }

        if (seller.getPickupAddress() != null
                && seller.getPickupAddress().getAddress() != null
                && seller.getPickupAddress().getMobile() != null
                && seller.getPickupAddress().getCity() != null
                && seller.getPickupAddress().getWard() != null
        ) {
            existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
            existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            existingSeller.getPickupAddress().setWard(seller.getPickupAddress().getWard());
            existingSeller.getPickupAddress().setMobile(seller.getPickupAddress().getMobile());
            existingSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());
        }

        if (seller.getGSTIN() != null) {
            existingSeller.setGSTIN(seller.getGSTIN());
        }
        return sellerRepository.save(existingSeller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
        Seller seller = getSellerById(sellerId);
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
}
