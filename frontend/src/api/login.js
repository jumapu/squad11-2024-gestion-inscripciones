import axios from "axios";

const API=''
export const userLogin = async (data) => {
    try {
      const response = await axios.post(`${API}/users/login`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'Los datos ingresados son incorrecto');
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No se recibió respuesta del servidor');
      } else {
        console.error('Error:', error.message);
        throw new Error('Error al realizar la solicitud de inicio de sesión');
      }
    }
  };