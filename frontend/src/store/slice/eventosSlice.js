import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventosList } from "@/api/eventos.js";
import { egresadosOne } from "@/api/egresados.js";

// Listar eventos
export const listeventos = createAsyncThunk("eventos/listEventos", async () => {
  try {
    const response = await eventosList();
    const eventoData = response.data;

    // Uso de Promise.all para obtener los egresados de los eventos
    const eventosConEgresados = await Promise.all(
      eventoData.map(async (evento) => {
        const egresadoResponse = await egresadosOne(evento.egresadoId);
        const egresado = egresadoResponse.data; // Renombrado para mayor claridad
        return {
          ...evento,
          egresado, 
        };
      })
    );

    return eventosConEgresados;
  } catch (error) {
    console.error("Error al buscar eventos:", error);
    throw error; // error en la lógica de consumo
  }
});

const eventosSlice = createSlice({
  name: "eventos",
  initialState: {
    loading: false,
    error: null,
    eventoCount: 0,
  },
  reducers: {
    incrementarEventoCount:(state)=>{
      state.eventoCount+= 1;
    },
    clearEventoData: (state) => {
      state.eventoData = [];
      state.eventoCount = 0; // Limpiar el conteo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listeventos.fulfilled, (state, action) => {
      state.loading = false; // Cambiar a false cuando se completa la carga
      state.eventoData = action.payload;
      state.eventoCount = action.payload.length;
    });
    builder.addCase(listeventos.pending, (state) => {
      state.loading = true; // Indicar que la carga está en curso
    });
    builder.addCase(listeventos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Manejar errores
    });
  },
});

// Selector para obtener el conteo de eventos
export const selectEventoCount = (state) => {
  console.log(state);
  return state.eventos.eventoCount;
}

// Exportar acciones y reducer
export const { clearEventoData } = eventosSlice.actions;
export default eventosSlice.reducer;
