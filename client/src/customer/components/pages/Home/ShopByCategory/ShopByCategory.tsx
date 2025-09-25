import React, { useEffect } from "react";
import ShopByCategoryCard from "./ShopByCategoryCard";
import { useAppSelector } from "../../../../../State/Store";
import store from './../../../../../State/Store';

const ShopByCategory = () => {
  const { customer } = useAppSelector((store) => store);

  return (
    <div className="flex flex-wrap justify-between gap-7 lg:px-28">
      {(customer.homePageData?.shopByCategories || []).slice(0,6).map((item) => (
        <ShopByCategoryCard item={item} />
      ))}
    </div>
  );
};

export default ShopByCategory;
