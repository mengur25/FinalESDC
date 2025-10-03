import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Address } from "../../types/AddressTypes";
const API_URL = "http://localhost:5454";

interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string | null;
  selectedAddress: number | null;
}

const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
  selectedAddress: null,
};

export interface AddressRequest {
  name: string;
  locality: string;
  address: string;
  city: string;
  ward: string;
  pinCode: string;
  mobile: string;
  selected: boolean;
}

export interface AddressResponse extends AddressRequest {
  id: number;
}

const getAuthHeader = () => {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
};

// Lấy tất cả địa chỉ của user
export const fetchAddresses = createAsyncThunk(
  "address/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      console.log("👉 Fetching addresses with headers:", getAuthHeader());
      const response = await axios.get<Address[]>(
        `${API_URL}/api/addresses`,
        getAuthHeader()
      );
      console.log("Fetched addresses:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Fetch addresses failed:", error.response || error.message);
      return rejectWithValue(
        error.response?.data || "Failed to fetch addresses"
      );
    }
  }
);

// Tạo mới địa chỉ cho user
export const createAddress = createAsyncThunk(
  "address/create",
  async (address: Omit<Address, "id" | "user">, { rejectWithValue }) => {
    try {
      const response = await axios.post<Address>(
        `${API_URL}/api/addresses`,
        address,
        getAuthHeader()
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to create address"
      );
    }
  }
);

// Xóa địa chỉ
export const deleteAddress = createAsyncThunk(
  "address/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/addresses/${id}`, getAuthHeader());
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to delete address"
      );
    }
  }
);

export const selectAddress = createAsyncThunk(
  "address/select",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.put<Address>(
        `${API_URL}/api/addresses/${id}/select`,
        {},
        getAuthHeader()
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to select address"
      );
    }
  }
);

export const updateAddress = createAsyncThunk(
  "address/update",
  async (
    { id, data }: { id: number; data: AddressRequest },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put<AddressResponse>(
        `${API_URL}/api/addresses/${id}`,
        data,
        getAuthHeader()
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update address"
      );
    }
  }
);




const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAddresses.fulfilled,
        (state, action: PayloadAction<Address[]>) => {
          state.loading = false;
          state.addresses = action.payload;
        }
      )
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create
      .addCase(
        createAddress.fulfilled,
        (state, action: PayloadAction<Address>) => {
          state.addresses.push(action.payload);
        }
      )
      .addCase(createAddress.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // delete
      .addCase(
        deleteAddress.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.addresses = state.addresses.filter(
            (addr) => addr.id !== action.payload
          );
        }
      )
      .addCase(deleteAddress.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
  selectAddress.fulfilled,
  (state, action: PayloadAction<Address>) => {
    state.addresses = state.addresses.map((addr) => ({
      ...addr,
      selected: addr.id === action.payload.id, 
    }));
    state.loading = false;
    state.selectedAddress = action.payload.id;
  }
)

      .addCase(updateAddress.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default addressSlice.reducer;
