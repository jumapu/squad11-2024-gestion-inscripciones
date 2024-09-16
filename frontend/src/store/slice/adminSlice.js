import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminsList } from "@/api/admin";

export const listadmins = createAsyncThunk("admins/listAdmins", async () => {
  try {
    const response = await adminsList();
    
    const adminData = response.data;

    return adminData;
  } catch (error) {
    console.error("Error buscar admin:", error);
    throw error;
  }
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listadmins.fulfilled, (state, action) => {
      state.loading = false;
      state.adminData = action.payload;
    });
  },
});

export const { clearadminData } = adminSlice.actions;
export default adminSlice.reducer;
