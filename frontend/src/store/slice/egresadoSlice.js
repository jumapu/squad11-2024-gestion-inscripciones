import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { egresadosList } from "@/api/egresados";

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
    egresadoCount: 0,
  },
  reducers: {
    clearEgresadoData: (state) => {
      state.egresadoData = [];
      state.egresadoCount = 0; // Limpiar el conteo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listegresados.fulfilled, (state, action) => {
      state.loading = "exito";
      state.egresadoData = action.payload;
      state.egresadoCount = action.payload.length;
    });
    builder.addCase(listegresados.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listegresados.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Manejar errores
    });
  },
});
// Conteo de egresados
export const selectEgresadoCount = (state) => state.mentor.mentorCount;
// Exportar acciones y reducer
export const { clearEgresadoData } = egresadoSlice.actions;
export default egresadoSlice.reducer;
