import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cart } from "../../types/CartType";
import { api } from "../../config/Api";
import { CouponState } from "../../types/couponTypes";

const API_URL = "/api/coupons";
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
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to apply failed" }
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
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(applyCoupon.pending, (state) =>{
            state.loading = true;
            state.error= null;
            state.couponApplied = false;
        })
    }
})