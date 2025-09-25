// src/State/Seller/SellerSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Seller } from "../../types/SellerTypes";

interface SellerState {
  profile: Seller | null;
  loading: boolean;
  error: string | null;
}

const initialState: SellerState = {
  profile: null,
  loading: false,
  error: null,
};

export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response.data);
      return response.data; 
    } catch (error: any) {
      rejectWithValue(error.response?.data || "Failed to fetch seller profile");
      return (error.response?.data);
    }
  }
);

const SellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SellerSlice.reducer;
