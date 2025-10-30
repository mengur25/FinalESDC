import React, { useEffect } from "react";
import { Divider, CircularProgress, Typography, Box } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { useParams } from "react-router-dom";
import { fetchReviewsByProductId, deleteReview } from "../../../../State/Customer/ReviewSlice";
// Assuming fetchProductById is available in a Product Slice
import { fetchProductById } from "../../../../State/Customer/ProductSlice"; 

// Helper function to safely format currency
const formatCurrency = (price: number | undefined) => {
    return price ? `$${price.toFixed(2)}` : '$0.00';
};


const ReviewList = () => {
    const { productId } = useParams();
    const dispatch = useAppDispatch();
    
    const { 
        reviews, loading, error, 
        selectedProduct, loading: productLoading // Load product data too
    } = useAppSelector(state => ({
        reviews: state.review.reviews,
        loading: state.review.loading,
        error: state.review.error,
        selectedProduct: state.product.product, 
    }));
    
    const product = selectedProduct; 
    useEffect(() => {
        if (productId) {
            const id = Number(productId);
            // 1. Fetch Reviews
            dispatch(fetchReviewsByProductId(id)); 
            dispatch(fetchProductById(id)); 
        }
    }, [dispatch, productId]);
    
    const handleDeleteReview = (reviewId: number) => {
        const jwt = localStorage.getItem('jwt') || '';
        if (window.confirm("Are you sure you want to delete this review?")) {
            dispatch(deleteReview({ reviewId, jwt }));
        }
    };

    // --- RENDER LOGIC ---
    const isLoadingInitial = (loading || productLoading) && !product;

    if (isLoadingInitial) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress />
                <Typography>Loading product and reviews...</Typography>
            </Box>
        );
    }
    
    // Calculate save percentage
    const mrp = product?.mrpPrice || 0;
    const sellingPrice = product?.sellingPrice || 0;
    const discountPercent = mrp > 0 ? ((mrp - sellingPrice) / mrp) * 100 : 0;


    return (
        <div className="p-5 lg:px-20 flex flex-col lg:flex-row gap-20">
            <section className="w-full md:w-1/2 lg:w-[30%] space-y-2">
                <img 
                    src={product?.images?.[0] || "/path/to/default/image.png"} 
                    alt={product?.title} 
                />
                <div>
                    <div>
                        <p className="font-bold text-xl">{product?.seller?.businessDetails?.bussinessName || 'Seller N/A'}</p>
                        <p className="text-lg text-gray-600">{product?.title}</p>
                    </div>
                    <div className="price flex items-center gap-3 mt-5 text-2xl">
                        <span className="font-sans text-gray-800">{formatCurrency(sellingPrice)}</span>
                        <span className="thin-line-through text-gray-400">{formatCurrency(mrp)}</span>
                        <span className="text-primary font-semibold">{`${discountPercent.toFixed(0)}% Off`}</span>
                    </div>
                </div>
            </section>
            
            <section className="space-y-5 w-full">
                {/* --- REVIEWS LIST --- */}
                <Typography variant="h5" fontWeight="bold">Customer Reviews ({reviews.length})</Typography>
                {error && <Typography color="error">{error}</Typography>}
                
                {reviews.length === 0 ? (
                    <Typography color="textSecondary">No reviews found for this product.</Typography>
                ) : (
                    reviews.map((review) => (
                        <div className="space-y-3" key={review.id}>
                            <ReviewCard review={review} onDelete={handleDeleteReview} /> 
                            <Divider />
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default ReviewList;