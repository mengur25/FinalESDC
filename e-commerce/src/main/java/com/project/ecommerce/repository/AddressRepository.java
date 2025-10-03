package com.project.ecommerce.repository;

import com.project.ecommerce.model.Address;
import com.project.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
    Optional<Address> findByIdAndUser(Long id, User user);

    boolean existsByIdAndUserId(Long addressId, Long userId);
}
