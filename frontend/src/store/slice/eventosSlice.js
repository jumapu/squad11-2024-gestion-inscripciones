import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventosList } from "@/api/eventos";
import { egresadosOne } from "@/api/egresados";
//Listar eventos
export const listeventos = createAsyncThunk("eventos/listEventos", async () => {
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
    console.error("Error al buscar eventos:", error);
    throw error;
  }
});

const eventoSlice = createSlice({
  name: "evento",
  initialState: {
    eventoData: [],
    loading: false,
    error: null,
    eventoCount: 0,
  },
  reducers: {
    clearEventoData: (state) => {
      state.eventoData = [];
      state.eventoCount = 0; // Limpiar el conteo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listeventos.fulfilled, (state, action) => {
      state.loading = "exito";
      state.eventoData = action.payload;
      state.eventoCount = action.payload.length;
    });
    builder.addCase(listeventos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listeventos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Manejar errores
    });
  },
});

// Conteo de eventos
export const selectEventoCount = (state) => state.evento.eventoCount;
//acciones y reducer
export const { clearEventoData } = eventoSlice.actions;
export default eventoSlice.reducer;
