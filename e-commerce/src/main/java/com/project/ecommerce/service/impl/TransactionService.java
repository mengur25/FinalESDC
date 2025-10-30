package com.project.ecommerce.service.impl;

import com.project.ecommerce.model.Order;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.Transaction;
import com.project.ecommerce.model.User;
import com.project.ecommerce.repository.SellerRepository;
import com.project.ecommerce.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService implements com.project.ecommerce.service.TransactionService {
    private final SellerRepository sellerRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction(Order order) {
        Long sellerId = order.getSellerId();
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new RuntimeException("Seller not found for order ID " + order.getId()));

        User customer = order.getUser();
        if (customer == null) {
            throw new RuntimeException("Customer (User) data is missing from the order object.");
        }

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(customer);
        transaction.setOrder(order);

        return transactionRepository.save(transaction);
    }

    @Override
    public List<Transaction> getTransactionsBySellerId(Seller seller) {
        return transactionRepository.findBySellerId(seller.getId());
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
