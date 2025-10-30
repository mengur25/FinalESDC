import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../../types/orderTypes"; // Đảm bảo import Order
import { Transaction } from "../../types/TransactionType";
import { api } from "../../config/Api";

interface TransactionState {
  transactions: any[]; 
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};

export const fetchTransactionsBySeller = createAsyncThunk<
  Order[],
  string,
  { rejectValue: string }
>(
  "transactions/fetchTransactionsBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/seller/orders", { 
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data; 
      
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch order history for seller");
    }
  }
);

export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>(
  "transactions/fetchAllTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/transactions");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch all transactions");
    }
  }
);

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchTransactionsBySeller.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTransactionsBySeller.fulfilled, (state, action: PayloadAction<Order[]>) => {
            state.loading = false;
            state.transactions = action.payload; 
        })
        .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        .addCase(fetchAllTransactions.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
            state.loading = false;
            state.transactions = action.payload; 
        })
        .addCase(fetchAllTransactions.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default transactionSlice.reducer;