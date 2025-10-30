import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../types/CartType";
import { api } from "../../config/Api";
import { Coupon, CouponState, CreateCouponRequest } from "../../types/couponTypes";

const API_URL = "/api/coupon"; 


export const getAllCoupons = createAsyncThunk<
    Coupon[], 
    void,
    { rejectValue: string }
>(
    "coupon/getAllCoupons",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/admin/all`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch coupons");
        }
    }
);

export const createCoupon = createAsyncThunk<
    Coupon, 
    CreateCouponRequest, 
    { rejectValue: string }
>(
    "coupon/createCoupon",
    async (couponData, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/admin/create`, couponData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create coupon");
        }
    }
);

export const deleteCoupon = createAsyncThunk<
    number, 
    number, 
    { rejectValue: string }
>(
    "coupon/deleteCoupon",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${API_URL}/admin/delete/${id}`);
            return id; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete coupon");
        }
    }
);

export const applyCoupon = createAsyncThunk<
    Cart,
    { apply: string; code: string; orderValue: number; jwt: string },
    {
        rejectValue: string;
    }
>(
    "coupon/applyCoupon",
    async ({ apply, code, orderValue, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_URL}/apply`, null, { 
                params: { apply, code, orderValue },
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to apply coupon"
            );
        }
    }
);


const initialState: CouponState = {
    coupons: [],
    cart:null,
    loading: false,
    error: null,
    couponCreated: false,
    couponApplied: false,
};

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) =>{
        builder
        .addCase(applyCoupon.pending, (state) =>{
            state.loading = true;
            state.error= null;
            state.couponApplied = false;
        })
        .addCase(applyCoupon.fulfilled, (state, action: PayloadAction<Cart>) => {
            state.loading = false;
            state.cart = action.payload;
            state.couponApplied = true;
        })
        .addCase(applyCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.couponApplied = false;
        })

        // --- GET ALL COUPONS ---
        .addCase(getAllCoupons.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllCoupons.fulfilled, (state, action: PayloadAction<Coupon[]>) => {
            state.loading = false;
            state.coupons = action.payload;
        })
        .addCase(getAllCoupons.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.coupons = [];
        })

        // --- CREATE COUPON ---
        .addCase(createCoupon.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.couponCreated = false;
        })
        .addCase(createCoupon.fulfilled, (state, action: PayloadAction<Coupon>) => {
            state.loading = false;
            state.coupons.push(action.payload);
            state.couponCreated = true;
        })
        .addCase(createCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.couponCreated = false;
        })

        // --- DELETE COUPON ---
        .addCase(deleteCoupon.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteCoupon.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.coupons = state.coupons.filter(coupon => coupon.id !== action.payload);
        })
        .addCase(deleteCoupon.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
});

export const { clearError } = couponSlice.actions;

export default couponSlice.reducer;