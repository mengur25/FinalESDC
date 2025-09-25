package com.project.ecommerce.service.impl;

import com.project.ecommerce.model.Order;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.Transaction;
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
        Seller seller = sellerRepository.findById(order.getSellerId()).get();

        Transaction transaction = new Transaction();
        transaction.setSeller(seller);
        transaction.setCustomer(order.getUser());
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
