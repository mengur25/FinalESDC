import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";
import { User } from "../types/UserType";


interface AuthState {
  user: User | null;
  jwt: string | null;
  fullName: string | null;
  role: string | null;
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  otpMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  jwt: null,
  fullName: null,
  role: null,
  loading: false,
  isLoggedIn: !!localStorage.getItem("jwt"),
  error: null,
  otpMessage: null,
};
export const loginSeller = createAsyncThunk(
  "auth/loginSeller",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/sellers/login", { email, password });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { message: "Login failed" });
    }
  }
);

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (
    { email, role }: { email: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/sent/otp", { email, role });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Send OTP failed" }
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk<any, any>(
  "auth/fetchUserProfile",
  async ({ jwt }, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        console.error("Fetch profile error:", err.response?.status, err.response?.data)
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      fullName,
      email,
      password,
      mobile,
      otp,
    }: {
      fullName: string;
      email: string;
      password: string;
      mobile: string;
      otp: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/signup", {
        fullName,
        email,
        password,
        mobile,
        otp,
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data || { message: "Register failed" }
      );
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.role = null;
      state.fullName = null;
      state.isLoggedIn = false;
      localStorage.removeItem("jwt");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.fullName = action.payload.fullName;
        state.isLoggedIn = true;
        localStorage.setItem("jwt", action.payload.jwt);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(loginSeller.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otpMessage = action.payload.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.jwt = action.payload.jwt;
        state.role = action.payload.role;
        state.fullName = action.payload.fullName;
        state.isLoggedIn = true;
        localStorage.setItem("jwt", action.payload.jwt);
        localStorage.setItem("role", action.payload.role);
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
