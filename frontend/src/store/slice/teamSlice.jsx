// Lógica para gestionar la información utilizando Redux Toolkit. 
// Permite:
// Obtener datos de mentores de manera asíncrona mediante una acción.
// Almacenar esos datos en el estado de la aplicación.
// Manejar el estado de carga y posibles errores.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { teamsList } from "@/api/team";
//Thunk para listar mentores
export const listteams = createAsyncThunk("teams/listTeams", async () => {
  try {
    const response = await teamsList();
    const teamData = response.data;

    return teamData;
  } catch (error) {
    console.error("Error buscar squad:", error);
    throw error;
  }
});
//Slice de teams
const teamSlice = createSlice({
  name: "team",
  initialState: {
    teamData: [],
    loading: false,
    error: null,
    teamCount: 0, //total de teams
  },
  reducers: {
    clearTeamData: (state) => {
      state.teamData = [];
      state.teamCount = 0; // Limpiar también el conteo
    },
  },
  extraReducers: (builder) => {
    builder.addCase(listteams.fulfilled, (state, action) => {
      state.loading = "exito";
      state.teamData = action.payload;
      state.teamCount = action.payload.length; //calcula y almacena la longitud de la lista recibida
    });
    builder.addCase(listteams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listteams.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message; // Manejar errores
    });
  },
});

// Conteo de teams
export const selectTeamCount = (state) => state.team.teamCount;
// Exportar acciones y reducer
export const { clearTeamData } = teamSlice.actions;
export default teamSlice.reducer;
