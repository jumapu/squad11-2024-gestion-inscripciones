import axiosInstance from "./interceptor.js";
import { toast } from "sonner";

export const registerUser = async (data, navigate, selectedOption) => {
  //* Usar Object.entries() para obtener clave e índice
  for (const [key, value] of Object.entries(data)) {
    if (value.trim() === "" || value == null) {
      toast.error(`El campo ${key} está vacío. Debe completarlo.`);
      return;
    }
  }

  console.log(selectedOption?.value);

  if (selectedOption?.value === undefined || selectedOption?.value === null) {
    toast.error("Seleccione el rol.");
    return;
  }

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

  axiosInstance
    .post(`auth/register`, { email, password, name, rol: value })
    .then((res) => {
      navigate("/login");
    });
};
