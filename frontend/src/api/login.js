import axiosInstance from "./interceptor.js";
import { toast } from "sonner";

export const userLogin = async (data, navigate) => {
  //* Usar Object.entries() para obtener clave e índice
  for (const [key, value] of Object.entries(data)) {
    if (value.trim() === "" || value == null) {
      toast.error(`El campo ${key} está vacío. Debe completarlo.`);
      return;
    }
  }

  axiosInstance.post(`auth/authentication`, data).then((res) => {
    if (res.rol === "admin") {
      navigate("/admindash");
    } else if (res.rol === "mentor") {
      navigate("/mentordash");
    } else if (res.rol === "student") {
      navigate("/egresadodash");
    } else {
      navigate("/home");
    }
  });
};
