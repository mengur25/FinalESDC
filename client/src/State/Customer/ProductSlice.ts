import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

const API_URL = "http://localhost:5454/products";

export const fetchProductById = createAsyncThunk<Product, Number>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);

      const data = response.data;
      console.log(data);
      return data;
    } catch (error: any) {
      console.log("error: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const searchProduct = createAsyncThunk<
  any,
  string,
  { rejectValue: string } 
>(
  "products/searchProduct",
  async (query, { rejectWithValue }) => { 
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: {
          query,
        },
      });

      const data = response.data;
      console.log("search result: ", data);
      return data;
    } catch (error: any) {
      console.log("error: " + error.message);
      return rejectWithValue(error.message || "Something went wrong"); 
    }
  }
);

export const fetchAllProducts = createAsyncThunk<any, any>(
  "products/fetchAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });

      const data = response.data;
      console.log("All products result: ", data);
      return data;
    } catch (error: any) {
      console.log("error: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);


export const fetchAllProductsSimple = createAsyncThunk<any[], void>(
    "product/fetchAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_URL}/all`); 
            
            console.log("All Products data fetched:", response.data); 
            
            return response.data; // Trả về mảng sản phẩm
        } catch (error: any) {
            console.error("Error fetching all products:", error);
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch all products"
            );
        }
    }
);
interface ProductState {
  product: Product | null;
  products: Product[];
  totalPages: number;
  loading: boolean;
  error: string | null | undefined;
  searchProduct: Product[] | [];
}

const initialState: ProductState = {
  product: null,
  products: [],
  totalPages: 0,
  loading: false,
  error: null,
  searchProduct: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload || null;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product";
    });
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload || [];
    });
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product";
    });
    builder.addCase(searchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.searchProduct = action.payload || [];
    });
    builder.addCase(searchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch product";
    })
    builder.addCase(fetchAllProductsSimple.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(fetchAllProductsSimple.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.loading = false;
            state.products = action.payload; 
        });

        builder.addCase(fetchAllProductsSimple.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "An unknown error occurred";
        });
  },
});

export default productSlice.reducer;