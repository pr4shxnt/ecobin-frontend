import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_BACKEND;

// Async thunk: Register landlord
export const registerLandlord = createAsyncThunk(
  "landlord/register",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const response = await axios.post(
        `${API_URL}/landlords/register`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || "registration failed. It's us not you"
      );
    }
  }
);

// Async thunk: Login landlord
export const loginLandlord = createAsyncThunk(
  "landlord/login",
  async (credentials, { rejectWithValue }) => {
    console.log("Landlord login attempt:", credentials.emailAddress);

    try {
      const response = await axios.post(
        `${API_URL}/landlords/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "error.message");
    }
  }
);

export const verifyLandlordAuthentication = (tkn) => {
  if (!tkn) return false;
  try {
    const payload = JSON.parse(atob(tkn.split(".")[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

const token = localStorage.getItem("landlord_session");

// Landlord slice
const landlordSlice = createSlice({
  name: "landlord",
  initialState: {
    landlord: null,
    token: null,
    loading: false,
    error: null,
    isLandlordAuthenticated: verifyLandlordAuthentication(token),
  },
  reducers: {
    logout: (state) => {
      state.landlord = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("landlord_session");
      localStorage.removeItem("landlord");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerLandlord.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerLandlord.fulfilled, (state, action) => {
      state.loading = false;
      state.landlord = action.payload.landlord;
      state.token = null; // token is usually from login
    });
    builder.addCase(registerLandlord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginLandlord.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginLandlord.fulfilled, (state, action) => {
      state.loading = false;
      state.landlord = action.payload.landlord;
      state.token = action.payload.token;
      state.isLandlordAuthenticated = true;
      // store token in localStorage
      localStorage.setItem("landlord_session", action.payload.token);
      localStorage.setItem("landlord", JSON.stringify(action.payload.landlord));
    });
    builder.addCase(loginLandlord.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = landlordSlice.actions;
export default landlordSlice.reducer;
