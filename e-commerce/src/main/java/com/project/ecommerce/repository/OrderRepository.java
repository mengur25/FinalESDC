package com.project.ecommerce.repository;

import com.project.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
    List<Order> findBySellerId(Long sellerId);
    @Query("SELECT o FROM Order o JOIN FETCH o.user WHERE o.sellerId = :sellerId")
    List<Order> findBySellerIdWithUser(@Param("sellerId") Long sellerId);
}
