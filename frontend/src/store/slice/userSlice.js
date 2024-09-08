import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { userLogin } from "@/api/login";
// Listar usuarios
export const listUser = createAsyncThunk("usuarios/user", async () => {
  try {
    const response = await userLogin();    
    const userData = response.data;
    console.log(userData)

    return userData;
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    throw error;
  }
});
// Slice de usuarios
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: [],
    loading: false,
    error: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(listUser.fulfilled, (state, action) => {
      state.loading = "exito";
      state.userData = action.payload;
    });
    
  },
});
// Exportar acciones y reducer
export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;
