import axiosInstance from "./interceptor.js";
import { toast } from "sonner";

export const registerUser = async (data, navigate, selectedOption) => {
  const { email, password, name, confirmpassword } = data;
  const { value } = selectedOption;
  if (password !== confirmpassword) {
    toast.error("Las contraseñas no coinciden");
    return;
  }
  if (password.length < 7) {
    toast.error("Las contraseña debe ser mayor  a 8 caracteres.");
    return;
  }

  //* Usar Object.entries() para obtener clave e índice
  for (const [key, value] of Object.entries(data)) {
    if (value.trim() === "" || value == null) {
      toast.error(`El campo ${key} está vacío. Debe completarlo.`);
      return;
    }
  }

  try {
    axiosInstance
      .post(`auth/register`, { email, password, name, rol: value })
      .then((res) => {
        navigate("/login");
      });
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response.data);
      toast.error(
        error.response.data.message || "Los datos ingresados son incorrectos"
      );
    } else if (error.request) {
      console.error("Error request:", error.request);
      toast.error("No se recibió respuesta del servidor");
    } else {
      console.error("Error:", error.message);
      toast.error("Error al realizar la solicitud de inicio de sesión");
    }
  }
};
