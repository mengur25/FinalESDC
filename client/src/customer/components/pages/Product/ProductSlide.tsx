import React, { useEffect } from "react";
import { useAppSelector } from "../../../../State/Store";
import ProductCard from "./ProductCard";

const ProductSlide = () => {
  const { product } = useAppSelector((store) => store);

  return (
    <div className="flex flex-wrap justify-between gap-7 lg:px-28">
      {(product.products || []).slice(0,6).map((item) => (
        <ProductCard item={item} />
      ))}
    </div>
  );
};

export default ProductSlide;
