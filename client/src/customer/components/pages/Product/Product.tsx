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
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import store, { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchAllProducts } from "../../../../State/Customer/ProductSlice";

const Product = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParams] = useSearchParams();
  const {category} = useParams();
  const{product} = useAppSelector((store =>store))

  const handleSortChange = (event: any) => {
    setSort(event.target.value);
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  useEffect(() =>{
    const [minPrice, maxPrice] = searchParam.get("price")?.split("-") || [];
    const color = searchParam.get("color");
    const minDiscount = searchParam.get("discount")?Number(searchParam.get("discount")): undefined;
    const pageNumber = page - 1;
    const newFilter = {
      category,
      color:color || "",
      minPrice: minPrice?Number(minPrice):undefined,
      maxPrice: maxPrice?Number(maxPrice):undefined,
      minDiscount,
      pageNumber,
    }
    dispatch(fetchAllProducts(newFilter))
  },[category, searchParam]);
  return (
    <div className="-z-10 mt-10">
      <div className="">
        <h1
          className="text-3xl text-center font-bold text-gray-700 pb-5 px-9 
        uppercase space-x-2"
        >
          Women
        </h1>
        <div className="lg:flex">
          <section className="filter_section hidden lg:block w-[20%]">
            <FilterSection />
          </section>
          <div className="w-full lg:w-[80%] space-y-5">
            <div className="flex justify-between items-center px-9 h-[40px] ">
              <div className="relative w-[50%]">
                {/* {isLarge && (
                  <IconButton>
                    <FilterAlt />
                  </IconButton>
                )}
                {isLarge && (
                  <Box>
                    <FilterSection />
                  </Box>
                )} */}
              </div>
              <FormControl size="small" sx={{ width: "200px" }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sort}
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
              {product.products.map((item) => (
                <ProductCard item={item}/>
              ))}
            </section>
          <div className="flex justify-center py-10">
            <Pagination
              onChange={(e, value) => handlePageChange(value)}
              count={10}
              variant="outlined"
              color="primary"
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
