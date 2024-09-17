import axiosInstance from "./interceptor.js";
import { toast } from "sonner";

export const userLogin = async (data, signIn, navigate) => {
  //* Usar Object.entries() para obtener clave e índice
  for (const [key, value] of Object.entries(data)) {
    if (value.trim() === "" || value == null) {
      toast.error(`El campo ${key} está vacío. Falta completar.`);
      return;
    }
  }

  axiosInstance.post(`auth/authentication`, data).then((res) => {
    console.log(res);
    signIn({
      auth: {
        token: res?.jwt,
        type: "Bearer",
      },
      userState: {
        rol: data?.rol,
        email: data?.email,
      },
    });
    if (res.rol === "admin") {
toast.error("Este usuario sera redirigido para poder acceder");
      navigate("/adminlogin");
      return;
    }

    if (res.rol === "mentor") {
      console.log(res.rol);
      navigate("/mentordash");
      return;
    }

    if (res.rol === "student") {
      navigate("/egresadodash");
      return;
    }

    navigate("/home");
  });
};
