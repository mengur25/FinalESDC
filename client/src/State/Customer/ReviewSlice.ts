import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

interface Review { id: number; reviewText: string; rating: number; user: any; createdAt: string; product: any; }
interface ReviewState { reviews: Review[]; loading: boolean; error: string | null; newReview: Review | null; }

const initialState: ReviewState = { reviews: [], loading: false, error: null, newReview: null };

export const fetchReviewsByProductId = createAsyncThunk<
    Review[],
    number,
    { rejectValue: string }
>(
    "review/fetchReviewsByProductId",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/products/${productId}/reviews`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch reviews");
        }
    }
);

export const deleteReview = createAsyncThunk<
    number,
    { reviewId: number; jwt: string },
    { rejectValue: string }
>(
    "review/deleteReview",
    async ({ reviewId, jwt }, { rejectWithValue }) => {
        try {
            await api.delete(`/api/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return reviewId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete review");
        }
    }
);

export const createReview = createAsyncThunk<
    Review,
    { 
        productId: number; 
        rating: number; 
        reviewText: string; 
        jwt: string 
    },
    { rejectValue: string }
>(
    "review/createReview",
    async ({ productId, rating, reviewText, jwt }, { rejectWithValue }) => {
        try {
            const requestBody = { productId, rating, reviewText };
            const response = await api.post(`/api/products/${productId}/reviews`, requestBody, {
                headers: { Authorization: `Bearer ${jwt}` },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create review");
        }
    }
);


const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviewsByProductId.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchReviewsByProductId.fulfilled, (state, action) => { state.loading = false; state.reviews = action.payload; })
            .addCase(fetchReviewsByProductId.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
            
            .addCase(createReview.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(createReview.fulfilled, (state, action) => { 
                state.loading = false; 
                state.newReview = action.payload;
                state.reviews = [action.payload, ...state.reviews]; 
            })
            .addCase(createReview.rejected, (state, action) => { 
                state.loading = false; 
                state.error = action.payload as string; 
            })

            .addCase(deleteReview.fulfilled, (state, action) => {
                state.reviews = state.reviews.filter(review => review.id !== action.payload);
            });
    }
});

export default reviewSlice.reducer;