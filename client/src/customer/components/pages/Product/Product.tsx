import React, { useEffect, useState } from "react";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Typography, // Thêm để hiển thị loading
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../../State/Customer/ProductSlice";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  
  // SỬA: Dùng kiểu string hoặc null cho sort
  const [sort, setSort] = useState<string | undefined>(undefined); 
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParams] = useSearchParams();
  const { category } = useParams();

  // SỬA: Đọc state an toàn và lấy các trường cần thiết
  const { products, totalPages, loading, error } = useAppSelector(state => state.product);
  
  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };
  
  // SỬA: Đảm bảo handlePageChange nhận giá trị số
  const handlePageChange = (value: number) => { 
    setPage(value);
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || [];
    const color = searchParam.get("color");
    const minDiscount = searchParam.get("discount") ? Number(searchParam.get("discount")) : undefined;
    const pageNumber = page - 1;

    // Xây dựng payload đầy đủ
    const newFilter = {
      category: category || "", // Đảm bảo category là chuỗi
      color: color || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minDiscount,
      pageNumber,
      sort, // Thêm sort vào filter
    };
    
    dispatch(fetchAllProducts(newFilter));
    
    // SỬA DEPENDENCY ARRAY: THÊM sort và page
  }, [category, searchParam, sort, page, dispatch]); 

  const formattedCategory = category ? category.replace(/_/g, ' ') : 'All Products';

  return (
    <div className="mt-10">
      <div className="">
        <h1
          className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 
          uppercase space-x-2"
        >
          {formattedCategory}
        </h1>
        <div className="lg:flex">
          <section className="filter_section hidden lg:block w-[20%]">
            <FilterSection />
          </section>
          <div className="w-full lg:w-[80%] space-y-5">
            <div className="flex justify-between items-center px-9 h-[40px] ">
              <div className="relative w-[50%]">
                {!isLarge && (
                  <IconButton>
                    <FilterAlt />
                  </IconButton>
                )}
              </div>
              <FormControl size="small" sx={{ width: "200px" }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sort || ''} 
                  onChange={handleSortChange}
                  label="Sort by"
                >
                  <MenuItem value={"price_low"}>Price low to high</MenuItem>
                  <MenuItem value={"price_high"}>Price high to low</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Divider />

            <section className="products_section grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-5 px-5 justify-center">
              {loading ? (
                <div className="col-span-full flex justify-center py-20">
                  <CircularProgress />
                </div>
              ) : products && products.length > 0 ? (
                products.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))
              ) : (
                <div className="col-span-full flex justify-center py-20">
                  <Typography variant="h6" color="textSecondary">
                    No products found matching your criteria.
                  </Typography>
                </div>
              )}
            </section>
            
            <div className="flex justify-center py-10">
              {products.length > 0 && totalPages > 1 && (
                <Pagination
                  onChange={(e, value) => handlePageChange(value)}
                  count={totalPages} 
                  page={page} 
                  variant="outlined"
                  color="primary"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;