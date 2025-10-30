import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { fetchProductById, fetchAllProducts } from "../../../../State/Customer/ProductSlice";
import {
  Button,
  Divider,
  CircularProgress,
  Typography,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import {
  Add,
  AddShoppingCart,
  FavoriteBorder,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import SimilarProduct from "../Page Details/SimilarProduct";
import { addItemToCart } from "../../../../State/Customer/cartSlice";
import {
  addProductToWishlist,
  getWishlistByUserId,
} from "../../../../State/Customer/wishlistSlice";
import {
  fetchReviewsByProductId,
  deleteReview,
} from "../../../../State/Customer/ReviewSlice";
import ReviewCard from "../Review/ReviewCard";
import { Product } from "../../../../types/ProductTypes";
import Review from "./../Review/Review"; // Assuming this is a React component, not a type
// Trong ProductDetails.tsx


const ReviewSummarySection = ({ productId }: { productId: number }) => {
  const dispatch = useAppDispatch();
  // Assuming the structure from the slice: state.review has { reviews, loading, error }
  const { reviews, loading, error } = useAppSelector(
    (state: any) => state.review
  );

  

  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProductId(productId));
    }
  }, [dispatch, productId]);


  useEffect(() => {
    if (productId) {
        dispatch(fetchProductById(Number(productId)));
        dispatch(fetchAllProducts({})); 
    }
}, [productId, dispatch]);

  const handleDeleteReview = (reviewId: number) => {
    const jwt = localStorage.getItem("jwt") || "";
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview({ reviewId, jwt }));
      // Note: the slice's extraReducer handles updating the reviews state
    }
  };

  return (
    <div className="mt-12 space-y-5">
      <h1 className="text-xl font-bold">Customer Reviews ({reviews.length})</h1>
      <Divider />

      {loading && <CircularProgress size={30} />}
      {error && <Typography color="error">{error}</Typography>}

      {reviews.length === 0 && !loading ? (
        <Typography color="textSecondary">
          No reviews found for this product.
        </Typography>
      ) : (
        // TS2749 fix: 'Review' is imported as a component, using 'any' for the review object from the store
        reviews.map((review: any) => (
          <div className="space-y-3" key={review.id}>
            <ReviewCard review={review} onDelete={handleDeleteReview} />
            <Divider />
          </div>
        ))
      )}
    </div>
  );
};
// --- END COMPONENT ---

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Fix: Removed 'wishlist' from destructuring since it was unused (L63:22)
  const { product } = useAppSelector((store: any) => store);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const jwt = localStorage.getItem("jwt");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const currentProduct: Product = product.product;
  const sizeOptions: string[] = currentProduct?.sizes?.split(" ") || [];

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
      rating: currentProduct.rating,
      numRatings: currentProduct.numRatings,
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
    if (!currentProduct.id) return;
    dispatch(addProductToWishlist({ productId: currentProduct.id! }))
      .unwrap()
      .then(() => dispatch(getWishlistByUserId()));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [id, dispatch]);

  if (!product.product)
    return <div className="text-center mt-10">Product not found</div>;

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {/* Fix: Explicitly typed map arguments (TS7006) */}
            {currentProduct.images?.map((item: string, index: number) => (
              <img
                key={index}
                onClick={() => setActiveImage(index)}
                className="lg:w-full w-[50px] cursor-pointer rounded-sm"
                src={item}
                alt={currentProduct.title || "Product Image"}
              />
            ))}
          </div>
          <div className="w-full lg:w-[85%]">
            <img
              className="w-full"
              src={currentProduct.images?.[activeImage]}
              alt={currentProduct.title || "Product Image"}
            />
          </div>
        </section>

        <section>
          <h1 className="font-bold text-lg text-primary">
            {currentProduct.seller?.businessDetails.bussinessName}
          </h1>
          <p className="text-gray-500 font-semibold">{currentProduct.title}</p>



          <div className="price flex items-center gap-3 mt-5 text-2xl">
            <span className="font-sans text-gray-800">
              ${currentProduct.sellingPrice}
            </span>
            <span className="line-through text-gray-400">
              ${currentProduct.mrpPrice}
            </span>
            <span className="text-primary font-semibold">
              {currentProduct.discountPercent}%
            </span>
          </div>
          <p className="text-sm">
            Inclusive of all taxes. Free Shipping above 100$
          </p>

          <div className="mt-7 space-y-3">
            <div className="flex item-center gap-4">
              <Shield sx={{ color: teal[500] }} />{" "}
              <p>Authentics & Quality Assured</p>
            </div>
            <div className="flex item-center gap-4">
              <WorkspacePremium sx={{ color: teal[500] }} />{" "}
              <p>100% money back guarantee</p>
            </div>
            <div className="flex item-center gap-4">
              <LocalShipping sx={{ color: teal[500] }} />{" "}
              <p>Free shipping & Returns</p>
            </div>
            <div className="flex item-center gap-4">
              <Wallet sx={{ color: teal[500] }} />{" "}
              <p>Pay on delivery might be available</p>
            </div>
          </div>

          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity(quantity + 1)}>
                <Add />
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="mb-2">SIZE</h1>
            <div className="flex gap-2 flex-wrap">
              {sizeOptions.map((size: string) => (
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

          <div className="mt-12 flex items-center gap-5">
            <Button
              fullWidth
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
              onClick={handleAddToWishlist}
            >
              Wish list
            </Button>
          </div>

          <div className="mt-5">
            <p>{currentProduct.description}</p>
          </div>

          {/* This renders the review summary section */}
          <ReviewSummarySection productId={currentProduct.id!} />
        </section>
      </div>

      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Products</h1>
        <div className="pt-5">
          <SimilarProduct
            currentProductId={currentProduct.id!}
            currentProductCategory={currentProduct.category?.categoryId || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
