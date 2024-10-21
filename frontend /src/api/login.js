import axiosInstance from "./interceptor.js";
import { toast } from "sonner";

export const userLogin = async (data, signIn, navigate) => {
  for (const [key, value] of Object.entries(data)) {
    if (value.trim() === "" || value == null) {
      toast.error(`El campo ${key} está vacío. Falta completar.`);
      return;
    }
  }

  try {
    const res = await axiosInstance.post(`auth/authentication`, data);

    if (res.jwt) {
      const token = res.jwt;

      signIn({
        auth: {
          token: token,
          type: "Bearer",
        },
        userState: {
          rol: res.rol,
          email: data.email,
        },
      });

      const role = res.rol;
      const userId = res.id;

      if (role === "admin") {
        navigate("/Dashboard");
      } else if (role === "mentor" || role === "student") {
        navigate(`/${userId}/eventos`);
      } else {
        toast.error("¡Error: rol de usuario no reconocido!");
      }
    } else {
      toast.error("¡Error de autenticación! Verifique sus credenciales.");
    }
  } catch (error) {
    console.log(error);
    if (error?.response?.data["404"]) {
      toast.error("¡Credenciales incorrectas.!");
      return;
    }
    console.error("Error de inicio de sesión:", error);
    toast.error("¡Error Interno! Por favor intente nuevamente más tarde.");
  }
};
