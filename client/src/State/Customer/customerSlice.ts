import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/HomeCatgoryTypes";
import { api } from "../../config/Api";

interface HomeState {
  homePageData: HomeData | null;
  homeCategory: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  homeCategory: [],
  loading: false,
  error: null,
};

export const createHomeCategory = createAsyncThunk<HomeData, HomeCategory[]>(
  "home/fetchHomePageData",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("home categories", response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      console.log(JSON.stringify(homeCategories));

      return rejectWithValue(
        error.response?.data?.error || "Failed to create home category"
      );
    }
  }
);



const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(createHomeCategory.pending, (state) =>{
            state.loading = true;
            state.error = null;
        })

        builder.addCase(createHomeCategory.fulfilled, (state, action) =>{
            state.loading = false;
            state.homePageData = action.payload;
        })
        builder.addCase(createHomeCategory.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message || "Failed to create home Categories";
        })
    }
})

export default homeSlice.reducer;