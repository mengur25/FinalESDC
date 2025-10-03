import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { fetchProductById } from "../../../../State/Customer/ProductSlice";
import { Button, Divider } from "@mui/material";
import {
  Add, AddShoppingCart, FavoriteBorder, LocalShipping,
  Remove, Shield, Star, Wallet, WorkspacePremium
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import ReviewCard from "../Review/ReviewCard";
import SimilarProduct from "../Page Details/SimilarProduct";
import { addItemToCart } from "../../../../State/Customer/cartSlice";
import { addProductToWishlist, getWishlistByUserId } from "../../../../State/Customer/wishlistSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { product, wishlist } = useAppSelector((store) => store);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const jwt = localStorage.getItem("jwt");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);



const handleAddToCart = () => {
  if (!jwt) {
    alert("Please login to add items to the cart");
    return;
  }

  if (!currentProduct?.id) return;

  if (!selectedSize) {
    alert("Please select a size before adding to cart");
    return;
  }

  const request = {
    productId: currentProduct.id,
    size: selectedSize,
    quantity: quantity,
  };

  dispatch(addItemToCart({ jwt, request }))
    .unwrap()
    .then(() => {
      console.log("Item added to cart successfully!");
    })
    .catch((err) => {
      console.error("Failed to add item:", err);
    });
};

const handleAddToWishlist = () => {
    dispatch(addProductToWishlist({ productId: currentProduct.id! }))
      .unwrap()
      .then(() => dispatch(getWishlistByUserId())); // refresh wishlist sau khi thêm
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id]);

  if (!product.product) return <div className="text-center mt-10">Product not found</div>;


  const currentProduct = product.product;
  const sizeOptions = currentProduct.sizes?.split(" ") || [];
  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Hình ảnh */}
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {currentProduct.images?.map((item, index) => (
              <img
                key={index}
                onClick={() => setActiveImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-sm"
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img className="w-full" src={currentProduct.images?.[activeImage]} alt="" />
          </div>
        </section>

        {/* Thông tin sản phẩm */}
        <section>
          <h1 className="font-bold text-lg text-primary">
            {currentProduct.seller?.businessDetails.bussinessName}
          </h1>
          <p className="text-gray-500 font-semibold">{currentProduct.title}</p>

          <div className="flex justify-between items-center py-2 border w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>{currentProduct.numRatings}</span>
              <Star sx={{ color: teal[500], fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>{currentProduct.numRatings} ratings</span>
          </div>

          {/* Giá */}
          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">${currentProduct.sellingPrice}</span>
            <span className="line-through text-gray-400">${currentProduct.mrpPrice}</span>
            <span className="text-primary font-semibold">{currentProduct.discountPercent}%</span>
          </div>
          <p className="text-sm">Inclusive of all taxes. Free Shipping above 100$</p>

          {/* Cam kết */}
          <div className="mt-7 space-y-3">
            <div className="flex item-center gap-4"><Shield sx={{ color: teal[500] }} /> <p>Authentics & Quality Assured</p></div>
            <div className="flex item-center gap-4"><WorkspacePremium sx={{ color: teal[500] }} /> <p>100% money back guarantee</p></div>
            <div className="flex item-center gap-4"><LocalShipping sx={{ color: teal[500] }} /> <p>Free shipping & Returns</p></div>
            <div className="flex item-center gap-4"><Wallet sx={{ color: teal[500] }} /> <p>Pay on delivery might be available</p></div>
          </div>

          {/* Số lượng */}
          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}><Remove /></Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}><Add /></Button>
            </div>
          </div>

          <div className="mt-5">
  <h1 className="mb-2">SIZE</h1>
  <div className="flex gap-2 flex-wrap">
    {sizeOptions.map((size) => (
      <Button
        key={size}
        variant={selectedSize === size ? "contained" : "outlined"}
        onClick={() => setSelectedSize(size)}
        sx={{ minWidth: "50px" }}
      >
        {size}
      </Button>
    ))}
  </div>
</div>


          {/* Nút */}
          <div className="mt-12 flex items-center gap-5">
            <Button fullWidth variant="contained" startIcon={<AddShoppingCart />} sx={{ py: "1rem" }} onClick={handleAddToCart}>Add to Cart</Button>
            <Button fullWidth variant="outlined" startIcon={<FavoriteBorder />} sx={{ py: "1rem" }} onClick={handleAddToWishlist}>Wish list</Button>
          </div>

          {/* Mô tả */}
          <div className="mt-5"><p>{currentProduct.description}</p></div>

          {/* Đánh giá */}
          <div className="mt-12 space-y-5">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>

      {/* Sản phẩm tương tự */}
      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Products</h1>
        <div className="pt-5"><SimilarProduct /></div>
      </div>
    </div>
  );
};

export default ProductDetails;
