// Lógica para gestionar la información utilizando Redux Toolkit. 
// Permite:
// Obtener datos de mentores de manera asíncrona mediante una acción.
// Almacenar esos datos en el estado de la aplicación.
// Manejar el estado de carga y posibles errores.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mentorsList } from "@/api/mentor";
//Thunk para listar mentores
export const listmentors = createAsyncThunk("mentors/listMentors", async () => {
  try {
    const response = await mentorsList();
    const mentorData = response.data;

    return mentorData;
  } catch (error) {
    console.error("Error buscar mentores:", error);
    throw error;
  }
});
//Slice de mentores
const mentorSlice = createSlice({
  name: "mentor",
  initialState: {
    mentorData: [],
    loading: false,
    error: null,
    mentorCount: 0, //total de mentores
  },
  reducers: {
    clearMentorData: (state) => {
      state.mentorData = [];
      state.mentorCount = 0; // Limpiar también el conteo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listmentors.fulfilled, (state, action) => {
      state.loading = "exito";
      state.mentorData = action.payload;
      state.mentorCount = action.payload.length; //calcula y almacena la longitud de la lista recibida
    });
    builder.addCase(listmentors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listmentors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Manejar errores
    });
  },
});

// Conteo de mentores
export const selectMentorCount = (state) => state.mentor.mentorCount;
// Exportar acciones y reducer
export const { clearMentorData } = mentorSlice.actions;
export default mentorSlice.reducer;
