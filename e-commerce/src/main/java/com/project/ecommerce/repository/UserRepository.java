package com.project.ecommerce.repository;

import com.project.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.email = :email")
    Optional<User> findByEmailWithAddresses(@Param("email") String email);
}
