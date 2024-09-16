import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Cargo eventos cuando el componente se monta

// Lista eventos
export const fetchEventos = createAsyncThunk('eventos/fetchEventos', async () => {
  const response = await fetch('http://localhost:8080/api/v1/admin/event/all');
  const autorizacion = response.headers.get("token");
  if (!response.ok || !autorizacion) {
    throw new Error("Error al obtener eventos: " + response.statusText);
  }

  const data = await response.json();
  return data; 
});

const eventosSlice = createSlice({
  name: "eventos",
  initialState: {
    loading: false,
    error: null,
    eventoCount: 0, // inicializa en el estado
    eventos: [],
  },
  reducers: {
    setEventos(state, action) {
      state.eventos = action.payload;
    },
    clearEventos: (state) => {
      state.eventos = [];
      state.eventoCount = 0; // Limpiar el conteo
      state.error = null; // Limpiar error si es necesario
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEventos.fulfilled, (state, action) => {
      state.loading = false; // Cambiar a false cuando se completa la carga
      state.eventos = action.payload;
      state.eventoCount = action.payload.length; // Asegurarse de que estos datos estén disponibles
      state.error = null; // Limpia el error si la carga fue exitosa
    });
    builder.addCase(fetchEventos.pending, (state) => {
      state.loading = true; // Indica que la carga está en curso
      state.error = null; // Limpia error al iniciar una nueva carga
    });
    builder.addCase(fetchEventos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Maneja errores
      state.eventos = []; // Limpia los datos en caso de error
      state.eventoCount = 0; // Limpia el conteo en caso de error
    });
  },
});

// Selector para obtener el conteo de eventos
export const selectEventoCount = (state) => {
  return state.eventos.eventoCount; // accedo al conteo 
}

export const { setEventos, clearEventos } = eventosSlice.actions; // exporta la acción
// Exportar acciones y reducer
export default eventosSlice.reducer;
