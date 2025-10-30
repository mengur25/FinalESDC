import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Product } from "../../types/ProductTypes";

export const fetchSellerProducts = createAsyncThunk<Product[], any>(
    "/sellerProduct/fetchSellerProducts",
    async(jwt, {rejectWithValue})=>{
        try {
            const response = await api.get(`/products`,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                }
            })
            const data = response.data;
            console.log("Product fetch" ,data)
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const createProduct = createAsyncThunk<Product, {request:any, jwt:string | null}>(
    "/sellers/createProduct",
    async(args, {rejectWithValue}) =>{
        const {request, jwt} = args;
        try {
            const response = await api.post(`/api/seller/products`, request,{
                headers:{
                    Authorization: `Bearer ${jwt}`,
                },
            })
            const data = response.data;
            console.log("Product created:", data);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
)

export const updateProductDetails = createAsyncThunk<
    Product,
    { productId: number; productData: Partial<Product> }, 
    { rejectValue: string }
>(
    'sellerProduct/updateProductDetails',
    async ({ productId, productData }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/seller/products/${productId}`, productData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update product details");
        }
    }
);



interface SellerProductState{
    products: Product[];
    loading:boolean;
    error: string | null;
}

const initialState: SellerProductState = {
    products: [],
    loading: false,
    error: null,
}

const sellerProductSlice =createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchSellerProducts.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(fetchSellerProducts.fulfilled, (state, action) =>{
            state.loading = false;
            state.products = action.payload|| [];
        })
        builder.addCase(fetchSellerProducts.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message || "Failed to fetch products";
        })
        builder.addCase(createProduct.pending, (state) =>{
            state.loading = true;
        })
        builder.addCase(createProduct.fulfilled, (state, action) =>{
            state.loading = false;
            state.products.push(action.payload);
        })
        builder.addCase(createProduct.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.error.message || "Failed to create product";
        })
    }
})

export default sellerProductSlice.reducer;