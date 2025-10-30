import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deal, DealsState } from "../../types/DealType";
import { api } from "../../config/Api";
import {
  DealUpdateRequestBody,
  HomeCategory,
} from "../../types/HomeCatgoryTypes";

interface DealStateWithCategories extends DealsState {
  homeCategories: HomeCategory[];
}

const initialState: DealStateWithCategories = {
  deals: [],
  homeCategories: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (deal: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create deal");
    }
  }
);

export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch deals");
    }
  }
);

export const deleteDeal = createAsyncThunk<number, number>(
  "deals/deleteDeal",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return id;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to delete deal");
    }
  }
);

export const getAllHomeCategories = createAsyncThunk<HomeCategory[]>(
  "deals/getAllHomeCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/admin/home-category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch home category");
    }
  }
);

export const updateDeal = createAsyncThunk<
  Deal,
  { id: number; updatedDeal: DealUpdateRequestBody },
  { rejectValue: string }
>("deals/updateDeal", async ({ id, updatedDeal }, { rejectWithValue }) => {
  try {
    const response = await api.patch(`/admin/deals/${id}`, updatedDeal);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || JSON.stringify(error.response.data)
      );
    }
    return rejectWithValue("Failed to update deal");
  }
});

const dealSlice = createSlice({
  name: "deal",
  initialState: initialState as DealsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDeals.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getAllDeals.fulfilled,
      (state, action: PayloadAction<Deal[]>) => {
        state.loading = false;
        state.deals = action.payload;
      }
    );
    builder.addCase(getAllDeals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.dealCreated = false;
    });
    builder.addCase(
      createDeal.fulfilled,
      (state, action: PayloadAction<Deal>) => {
        state.loading = false;
        state.deals.push(action.payload);
        state.dealCreated = true;
      }
    );
    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.dealCreated = false;
    });

    builder.addCase(deleteDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      deleteDeal.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.deals = state.deals.filter((deal) => deal.id !== action.payload);
      }
    );
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(getAllHomeCategories.pending, (state) => {
      (state as DealStateWithCategories).loading = true;
      (state as DealStateWithCategories).error = null;
    });
    builder.addCase(
      getAllHomeCategories.fulfilled,
      (state, action: PayloadAction<HomeCategory[]>) => {
        (state as DealStateWithCategories).loading = false;
        (state as DealStateWithCategories).homeCategories = action.payload;
      }
    );
    builder.addCase(getAllHomeCategories.rejected, (state, action) => {
      (state as DealStateWithCategories).loading = false;
      (state as DealStateWithCategories).error = action.payload as string;
      (state as DealStateWithCategories).homeCategories = [];
    });
    builder.addCase(
      updateDeal.fulfilled,
      (state, action: PayloadAction<Deal>) => {
        const index = state.deals.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.deals[index] = action.payload;
        }
      }
    );
  },
});

export default dealSlice.reducer;
