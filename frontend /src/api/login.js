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
  console.log(data);

  axiosInstance.post(`auth/authentication`, data).then((res) => {
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
      navigate("/Dashboard");
      return;
    }

    if (res.rol === "mentor") {
      navigate("/user/eventos");
      return;
    }

    if (res.rol === "student") {
      navigate("/user/eventos");
      return;
    }

    navigate("/home");
  });
};
