package com.project.ecommerce.service;

import com.project.ecommerce.model.Home;
import com.project.ecommerce.model.HomeCategory;

import java.util.List;

public interface HomeService {
    public Home createHomePageData(List<HomeCategory> allCategories);
}
