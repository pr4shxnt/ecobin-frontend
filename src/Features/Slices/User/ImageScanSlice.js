import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk: scan waste image by sending base64 string (raw) to backend
export const scanWasteImage = createAsyncThunk(
  "imageScan/scanWasteImage",
  async (base64Data, { rejectWithValue }) => {
    try {
      // base64Data should be the raw base64 string without data URL prefix
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/classify`,
        { imageData: base64Data }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  reply: null,
};

const imageScanSlice = createSlice({
  name: "imageScan",
  initialState,
  reducers: {
    resetScanState(state) {
      state.loading = false;
      state.error = null;
      state.reply = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(scanWasteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scanWasteImage.fulfilled, (state, action) => {
        state.loading = false;
        // API shape: { reply: { ... } }
        state.reply = action.payload?.reply ?? action.payload ?? null;
      })
      .addCase(scanWasteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Scan failed";
      });
  },
});

export const { resetScanState } = imageScanSlice.actions;
export default imageScanSlice.reducer;
