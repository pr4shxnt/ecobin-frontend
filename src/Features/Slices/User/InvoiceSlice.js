import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for creating an invoice
export const createInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async (invoiceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/invoice/${token}`,
        invoiceData,
        {
          headers: {
            Authorization: `Bearer ${invoiceData.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getInvoice = createAsyncThunk(
  "invoice/getInvoice",
  async (invoiceData, { rejectWithValue }) => {
    const token =
      localStorage.getItem("tenant_session") ||
      localStorage.getItem("landlord_session");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND}/invoice/${token}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const initialState = {
  invoice: null,
  loading: false,
  error: null,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default invoiceSlice.reducer;
