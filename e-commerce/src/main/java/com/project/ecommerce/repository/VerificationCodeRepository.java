package com.project.ecommerce.repository;

import com.project.ecommerce.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long> {
    VerificationCode findByEmail(String email);
    VerificationCode findByOtp(String otp);

    @Modifying
    @Query("DELETE FROM VerificationCode v WHERE v.email = ?1")
    int deleteByEmail(String email);
}
