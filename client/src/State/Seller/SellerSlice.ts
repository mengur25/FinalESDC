// src/State/Seller/SellerSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { AccountStatus, Seller, SellerReport } from "../../types/SellerTypes"; // Đảm bảo bạn đã định nghĩa AccountStatus và Seller

interface SellerState {
  profile: Seller | null;
  sellers: Seller[]; // Thêm mảng để lưu danh sách người bán
  loading: boolean;
  error: string | null;
  updateStatusLoading: boolean;
  report: SellerReport | null;
}

const initialState: SellerState = {
  profile: null,
  sellers: [], // Khởi tạo rỗng
  loading: false,
  error: null,
  updateStatusLoading: false,
  report: null,
};

// --- ASYNC THUNKS ---

// 1. Lấy danh sách tất cả người bán (có thể lọc theo status)
export const getAllSellers = createAsyncThunk(
  "sellers/getAllSellers",
  async (status: AccountStatus | undefined, { rejectWithValue }) => {
    try {
      // Xây dựng query parameter nếu có status
      const query = status ? `?status=${status}` : "";
      const response = await api.get(`/sellers${query}`);
      return response.data; // Danh sách Seller
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch sellers");
    }
  }
);

// 2. Cập nhật trạng thái người bán
export const updateSellerStatus = createAsyncThunk(
  "sellers/updateSellerStatus",
  async (
    { id, status }: { id: number; status: AccountStatus },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/admin/seller/${id}/status/${status}`);
      return response.data; // Seller đã được cập nhật
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update seller status"
      );
    }
  }
);

// (Giữ nguyên fetchSellerProfile)
export const fetchSellerProfile = createAsyncThunk(
  "sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch seller profile"
      );
    }
  }
);

export const fetchSellerReport = createAsyncThunk<
  SellerReport,
  string, // jwt
  { rejectValue: string }
>("sellers/fetchSellerReport", async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get("/sellers/report", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch seller report"
    );
  }
});

const SellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    // Reducer để reset trạng thái lỗi/loading (nếu cần)
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- fetchSellerProfile ---
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
      })
      // --- getAllSellers ---
      .addCase(getAllSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllSellers.fulfilled,
        (state, action: PayloadAction<Seller[]>) => {
          state.loading = false;
          state.sellers = action.payload; // Lưu danh sách người bán
        }
      )
      .addCase(getAllSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // --- updateSellerStatus ---
      .addCase(updateSellerStatus.pending, (state) => {
        state.updateStatusLoading = true;
        state.error = null;
      })
      .addCase(
        updateSellerStatus.fulfilled,
        (state, action: PayloadAction<Seller>) => {
          state.updateStatusLoading = false;
          // Cập nhật người bán trong mảng `sellers`
          const updatedSeller = action.payload;
          const index = state.sellers.findIndex(
            (s) => s.id === updatedSeller.id
          );
          if (index !== -1) {
            state.sellers[index] = updatedSeller;
          }
        }
      )
      .addCase(updateSellerStatus.rejected, (state, action) => {
        state.updateStatusLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.report = action.payload;
      });
    builder.addCase(fetchSellerReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch seller report";
    });
  },
});

export const { clearError } = SellerSlice.actions;

export default SellerSlice.reducer;
