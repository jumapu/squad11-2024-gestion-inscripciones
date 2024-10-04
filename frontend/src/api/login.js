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

    if (
      res.rol === "admin" 
      //&& window.location.href.includes("http://localhost:5173/adminlogin") //QA: error en esta linea de codigo. No permite el ingreso autenticado por rol
    ) {
      navigate("/Dashboard");
      return;
    }

    if (res.rol === "mentor") {
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
