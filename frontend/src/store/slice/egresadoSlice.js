import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { egresadosList } from "../../api/egresados";

export const listegresados = createAsyncThunk("egresados/listEgresados", async () => {
  try {
    const response = await egresadosList();
    
    const egresadoData = response.data;

    return egresadoData;
  } catch (error) {
    console.error("Error buscar egresados:", error);
    throw error;
  }
});

const egresadoSlice = createSlice({
  name: "egresado",
  initialState: {
    egresadoData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listegresados.fulfilled, (state, action) => {
      state.loading = "exito";
      state.egresadoData = action.payload;
    });
  },
});

export const { clearEgresadoData } = egresadoSlice.actions;
export default egresadoSlice.reducer;
