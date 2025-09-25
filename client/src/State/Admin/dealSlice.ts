import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Deal, DealsState } from "../../types/DealType";
import { api } from "../../config/Api";

const initialState: DealsState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};


export const createDeal = createAsyncThunk("deals/createDeal", async (deal: any, {rejectWithValue})=>{
    try {
        const response = await api.post("/admin/deals", deal, {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt")}`
            }
        })

        return response.data;
    } catch (error:any) {
        if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create deal");
    }
})

export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals", async (_, {rejectWithValue})=>{
    try {
      const response = await api.get("/admin/deals", {
        headers:{
          "Content-Type" : "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      })
console.log("get all deal", response.data);
      return response.data;
    } catch (error:any) {
        if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to create deal");
    }
  }
)

export const deleteDeal= createAsyncThunk<
  any, number
>("deals/deleteDeal", async(id: number, {rejectWithValue})=>{
  try {
    const response = await api.delete(`/admin/deals/${id}`, {
      headers:{
        "Content-Type": "application/json"
      }
    })

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to create deal");
  }
})

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDeals.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllDeals.fulfilled, (state, action: PayloadAction<Deal[]>) => {
      state.loading = false;
      state.deals = action.payload;
    });
    builder.addCase(getAllDeals.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.dealCreated = false;
    });
    builder.addCase(createDeal.fulfilled, (state, action: PayloadAction<Deal>) => {
      state.loading = false;
      state.deals.push(action.payload);
      state.dealCreated = true;
    });
    builder.addCase(createDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.dealCreated = false;
    });

    builder.addCase(deleteDeal.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDeal.fulfilled, (state, action: PayloadAction<{ id: number }>) => {
      state.loading = false;
      state.deals = state.deals.filter((deal) => deal.id !== action.payload.id);
    });
    builder.addCase(deleteDeal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default dealSlice.reducer;