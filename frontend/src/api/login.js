// import axiosInstance from "./interceptor.js";
// //import { toast } from "sonner";
// // const API = "http://gestioninscripciones.us-east-2.elasticbeanstalk.com/api/v1"
// export const userLogin = async (data, navigate) => {
//   //* Usar Object.entries() para obtener clave e índice
//   // for (const [key, value] of Object.entries(data)) {
//   //   if (value.trim() === "" || value == null) {
//   //     toast.error(`El campo ${key} está vacío. Falta completar.`);
//   //     return;
//   //   }
//   // }
//   try {
//     const response = await  axiosInstance.post(`auth/authentication`, data)
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       console.error('Error response:', error.response.data);
//       throw new Error(error.response.data.message || 'Los datos ingresados son incorrecto');
//     } else if (error.request) {
//       console.error('Error request:', error.request);
//       throw new Error('No se recibió respuesta del servidor');
//     } else {
//       console.error('Error:', error.message);
//       throw new Error('Error al realizar la solicitud de inicio de sesión');
//     }
//   }
//   // axiosInstance.post(`auth/authentication`, data).then((res) => {
//   //   if (res.rol === "admin") {
//   //     navigate("/admindash");
//   //   } else if (res.rol === "mentor") {
//   //     navigate("/mentordash");
//   //   } else if (res.rol === "student") {
//   //     navigate("/egresadodash");
//   //   } else {
//   //     navigate("/home");
//   //   }
//   // });
// };
import axiosInstance from "./interceptor.js";
export const userLogin = async (data, navigate) => { 
  try {
    const response = await axiosInstance.post(`auth/authentication`, data);
    const userData = response.data;

    // Redirigir según el rol del usuario
    if (userData.rol === "admin") {
      navigate("/admindash");
    } else if (userData.rol === "mentor") {
      navigate("/mentordash");
    } else if (userData.rol === "student") {
      navigate("/egresadodash");
    } else {
      navigate("/home");
    }

    return userData; // Devolver los datos del usuario, si es necesario

  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Los datos ingresados son incorrectos');
    } else if (error.request) {
      console.error('Error request:', error.request);
      throw new Error('No se recibió respuesta del servidor');
    } else {
      console.error('Error:', error.message);
      throw new Error('Error al realizar la solicitud de inicio de sesión');
    }
  }
};
