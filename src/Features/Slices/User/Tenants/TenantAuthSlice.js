import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL
const API_URL = import.meta.env.VITE_BACKEND;

// Async thunk: Register tenant
export const registerTenant = createAsyncThunk(
  "tenant/register",
  async (formData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      const response = await axios.post(
        `${API_URL}/tenants/register`,
        formData,
        config
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "registration failed. It's us not you"
      );
    }
  }
);

// Async thunk: Login tenant
export const loginTenant = createAsyncThunk(
  "tenant/login",
  async (credentials, { rejectWithValue }) => {
    console.log("Login attempt:", credentials.email);

    try {
      const response = await axios.post(
        `${API_URL}/tenants/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.message || "Login failed.");
    }
  }
);

export const verifyTenantAuthentication = (tkn) => {
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

const token = localStorage.getItem("tenant_session");

//get details

export const getTenant = createAsyncThunk(
  "tenant/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/tenants/profile/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "No user found");
    }
  }
);

export // Tenant slice
const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    tenant: null,
    token: null,
    loading: false,
    error: null,
    isTenantAuthenticated: verifyTenantAuthentication(token),
  },
  reducers: {
    setIsTenantAuthenticated: (state, action) => {
      state.isTenantAuthenticated = action.payload;
    },
    logout: (state) => {
      state.tenant = null;
      state.token = null;
      state.isTenantAuthenticated = false;
      localStorage.removeItem("tenant_session");
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerTenant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.tenant = action.payload.data;
      state.token = null; // token is usually from login
    });
    builder.addCase(registerTenant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginTenant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.tenant = action.payload.tenant;
      state.token = action.payload.token;
      localStorage.setItem("tenant_session", action.payload.token);
    });
    builder.addCase(loginTenant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getTenant.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTenant.fulfilled, (state, action) => {
      state.loading = false;
      state.tenant = action.payload;
      state.error = null;
    });
    builder.addCase(getTenant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = tenantSlice.actions;
export default tenantSlice.reducer;
