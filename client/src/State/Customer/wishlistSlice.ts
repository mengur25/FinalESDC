import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../types/wishlistTypes";
import { api } from "../../config/Api";

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const getWishlistByUserId = createAsyncThunk(
  "wishlist/getWishlistByUserId",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/wishlist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("wishlist fetch:", res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Failed to fetch wishlist"
      );
    }
  }
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async ({ productId }: { productId: number }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `/api/wishlist/add-product/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("add product:", res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data.message || "Failed to add product to wishlist"
      );
    }
  }
);


const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers:{
        resetWishlistState: (state) =>{
            state.wishlist = null;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) =>{
        builder.addCase(getWishlistByUserId.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        builder.addCase(getWishlistByUserId.fulfilled,(state, action: PayloadAction<Wishlist>)=>{
            state.wishlist = action.payload;
            state.loading = false
        })

        builder.addCase(getWishlistByUserId.rejected,(state, action: PayloadAction<any>)=>{
            state.loading = false;
            state.error = action.payload;
        })

        builder.addCase(addProductToWishlist.pending, (state)=>{
            state.loading = true;
            state.error = null;
        })

        builder.addCase(addProductToWishlist.fulfilled,(state, action: PayloadAction<Wishlist>)=>{
            state.wishlist = action.payload;
            state.loading = false
        })

        builder.addCase(addProductToWishlist.rejected,(state, action: PayloadAction<any>)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {resetWishlistState} = wishlistSlice.actions;

export default wishlistSlice.reducer;