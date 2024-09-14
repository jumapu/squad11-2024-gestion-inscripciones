import axios from "axios";
import { toast } from "sonner";

//* Crea una instancia de Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/v1", //* Configura la URL base de tu API
  //http://localhost:8080/v3/api-docs
  //v3/api-docs
});

//* Interceptor para agregar el token a las solicitudes
axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token"); //* Obtén el token desde donde lo tengas almacenado

    if (token) {
      request.headers["Authorization"] = token;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//* Interceptor para capturar el token en la respuesta
axiosInstance.interceptors.response.use(
  (response) => {
    //* Verifica si la URL de la solicitud original comienza con '/v1/auth/'
    if (response.data.jwt && response.data.jwt.startsWith("Bearer ")) {
      //* Suponiendo que el token está en response.data.token
      const token = response.data.jwt;

      console.log(token);

      if (token) {
        localStorage.removeItem("token");
        //* Guarda el token en localStorage
        localStorage.setItem("token", token);
        return response.data;
      }
    }

    return response;
  },
  (error) => {
    //! virificar las response de  errores del back todos!

    if (error?.response?.data["404"] === "Email in used")
      toast.error("El email ya esta se encuentra en uso.");
    if (error?.response?.data["404"] === "Incorrect password")
      toast.error("Contraseña incorrecta.");
    if (error?.response?.data["404"] === "Email not Found")
      toast.error("Email no registrado.");
    if (error?.response?.data["PASSWORD"])
      toast.error("Contraseña debe tener 8  caracteres minimos..");

    console.log(error?.response?.data);
    return Promise.reject(error);
  }
);

export default axiosInstance;
