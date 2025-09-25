import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../../types/couponTypes";
import { api } from "../../config/Api";

const API_URL = "/api/coupons";
interface DealState {
  deals: Coupon[];
  loading: boolean;
  error: string | null;
  dealCreated: boolean;
}

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
};
export const createCoupon = createAsyncThunk<
  Coupon,
  { coupon: any; jwt: string },
  { rejectValue: string }
>("coupon/createCoupon", async ({ coupon, jwt }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${API_URL}/admin/create`, coupon, {
        headers: {Authorization: `Bearer ${jwt}`}
    });
    console.log("Create coupon: ", response.data);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to create deal");
  }
});


