package com.project.ecommerce.service;

import com.project.ecommerce.model.Order;
import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.Transaction;

import java.util.List;

public interface TransactionService {
    Transaction createTransaction(Order order);
    List<Transaction> getTransactionsBySellerId(Seller seller);
    List<Transaction> getAllTransactions();
}
