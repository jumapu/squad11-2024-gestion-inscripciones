import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventosList } from "@/api/eventos";
import { egresadosOne } from "@/api/egresados";

export const listEventos = createAsyncThunk("eventos/listEventos", async () => {
  try {
    const response = await eventosList();
    const eventoData = response.data;

    const eventosConEgresados = await Promise.all(
      eventoData.map(async (evento) => {
        const egresado = await egresadosOne(evento.egresadoId);
        const egresadoone = egresado.data;
        return {
          ...evento,
          egresadoone,
        };
      })
    );

    return eventosConEgresados;
  } catch (error) {
    console.error("Error buscar citas:", error);
    throw error;
  }
});

const eventoSlice = createSlice({
  name: "evento",
  initialState: {
    eventoData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listEventos.fulfilled, (state, action) => {
      state.loading = "exito";
      state.eventoData = action.payload;
    });
  },
});

export const { clearEventoData } = eventoSlice.actions;
export default eventoSlice.reducer;
