package com.project.ecommerce.service;

import com.project.ecommerce.model.Seller;
import com.project.ecommerce.model.SellerReport;

public interface SellerReportService {
    SellerReport getSellerReport(Seller seller);
    SellerReport updateSellerReport(SellerReport sellerReport);
}
