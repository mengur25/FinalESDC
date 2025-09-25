package com.project.ecommerce.controllers;

import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.Transaction;
import com.project.ecommerce.service.SellerService;
import com.project.ecommerce.service.impl.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/transactions")
public class TransactionController {

    private final SellerService sellerService;
    private final TransactionService transactionService;

    @GetMapping("/seller")
    public ResponseEntity<List<Transaction>> getTransactionSeller(
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Seller seller = sellerService.getSellerProfile(jwt);

        List<Transaction> transactions = transactionService.getTransactionsBySellerId(seller);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(){

            List<Transaction> transactions = transactionService.getAllTransactions();
            return ResponseEntity.ok(transactions);
    }

}
