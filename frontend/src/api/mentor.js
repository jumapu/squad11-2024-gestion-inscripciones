import axios from 'axios'

const API='http://gestioninscripciones.us-east-2.elasticbeanstalk.com/api/v1'

export const mentorList= async () => 
{
    try {
        const response =  await axios.get(`${API}/mentor/`)
        return response
    } catch (error) {
        console.error('error al ver los mentores:', error)
        throw error
    }
}

export const mentorPost = async (data) =>{
    try {
        const response = await axios.post(`${API}/mentor/`,data)
        return response
    } catch (error) {
        console.error('error al cargar mentor: ',error)
        throw error
    }
}

export const mentorOne = async (id) => {
    try {
        const response = await axios.get(`${API}/mentor/${id}`)
        return response;
    } catch (error) {
        console.error('error al encontrar el mentor:', error);
        throw error
    }
}

export const mentorDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/mentor/${id}`)
        if (response.status === 200) {
            console.log('mentor borrado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al borrar el mentor:', error);
        throw error
    }
}

export const mentorUpdate = async (data) => {
    try {
        const response = await axios.put(`${API}/mentor/${data.id}`, data)
        if (response.status === 200) {
            console.log('mentor editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el mentor:', error);
        throw error
    }
} 
    