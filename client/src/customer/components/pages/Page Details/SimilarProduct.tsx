import React, { useMemo } from "react";
import SimilarProductCard from "./SimilarProductCard";
import { useAppSelector } from "../../../../State/Store";
import { Product } from "../../../../types/ProductTypes";

interface SimilarProductProps {
  currentProductId: number;
  currentProductCategory: string;
}

const SimilarProduct: React.FC<SimilarProductProps> = ({
  currentProductId,
  currentProductCategory,
}) => {
  const { products, loading } = useAppSelector((state: any) => state.product);

  const allProducts: Product[] = products || [];

  const similarProducts: Product[] = useMemo(() => {
    if (!currentProductCategory) return [];

    return allProducts
      .filter((product: Product) => {
        const isCurrentProduct = product.id === currentProductId;

        const isSameCategory = product.category?.categoryId === currentProductCategory; 
        

        return !isCurrentProduct && isSameCategory;
      })
      .slice(0, 6);
}, [allProducts, currentProductCategory, currentProductId]);

  if (loading) {
    return <div className="text-center">Loading products for filtering...</div>;
  }

  return (
    <div
      className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1
            justify-between gap-4 gap-y-8"
    >
      {similarProducts.length === 0 ? (
        <div className="lg:col-span-6 text-center text-gray-500">
          No similar products found in the current list.
        </div>
      ) : (
        similarProducts.map((product: Product) => (
          <SimilarProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default SimilarProduct;
