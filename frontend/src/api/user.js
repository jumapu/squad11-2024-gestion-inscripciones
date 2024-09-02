import axios from 'axios'

const API='https://gestioninscripciones.us-east-2.elasticbeanstalk.com/api/v1/'
//http://localhost:8080/swagger-ui/index.html#/

export const usuariosList= async () => 
{
    try {
        const response =  await axios.get(`${API}/users/`)
        return response
    } catch (error) {
        console.error('error al ver los usuarios:', error)
        throw error
    }
}

export const usuariosPost = async (data) =>{
    try {
        const response = await axios.post(`${API}/users/`,data)
        return response
    } catch (error) {
        console.error('error al cargar usuario: ',error)
        throw error
    }
}

export const usuarioOne= async (id) => {
    try {
        const response = await axios.get(`${API}/users/${id}`)
        return response;
    } catch (error) {
        console.error('error al encontrar el usuario:', error);
        throw error
    }
}

export const usuariosDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/users/${id}`)
        if (response.status === 200) {
            console.log('usuario borrado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al borrar el usuario:', error);
        throw error
    }
}

export const usuariosUpdate = async (data) => {
    try {
        const response = await axios.put(`${API}/users/${data.id}`, data)
        if (response.status === 200) {
            console.log('Usuario editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el usuario:', error);
        throw error
    }
} 
    