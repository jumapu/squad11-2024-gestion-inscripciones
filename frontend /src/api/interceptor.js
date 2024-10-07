import axios from "axios";
import { toast } from "sonner";

// Crea una instancia de Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  httpsAgent: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a las solicitudes
axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers["Authorization"] = token;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.jwt && response.data.jwt.startsWith("Bearer ")) {
      const token = response.data.jwt;

      if (token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
        return response.data;
      }
    }

    return response;
  },
  (error) => {
    if (error?.response?.data["404"] === "Email in use")
      toast.error("El email ya esta se encuentra en uso.");
    if (error?.response?.data["404"] === "Incorrect password")
      toast.error("Contraseña incorrecta.");
    if (error?.response?.data["404"] === "Email not Found")
      toast.error("Email no registrado.");
    if (error?.response?.data["PASSWORD"])
      toast.error("La contraseña debe tener como minimo 8 caracteres..");

    return Promise.reject(error);
  }
);

export default axiosInstance;
