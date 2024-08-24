import axios from 'axios'

const API='https://gestioninscripciones.us-east-2.elasticbeanstalk.com/api/v1/'

export const eventosList= async () => 
{
    try {
        const response =  await axios.get(`${API}/evento/`)
        return response
    } catch (error) {
        console.error('error al ver los eventos:', error)
        throw error
    }
}

export const eventosPost = async (data) =>{
    try {
        const response = await axios.post(`${API}/evento/`,data)
        return response
    } catch (error) {
        console.error('error al cargar el evento: ',error)
        throw error
    }
}

export const eventosOne = async (id) => {
    try {
        const response = await axios.get(`${API}/evento/${id}`)
        return response;
    } catch (error) {
        console.error('error al encontrar el evento:', error);
        throw error
    }
}

export const eventosDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/evento/${id}`)
        if (response.status === 200) {
            console.log('evento borrado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al borrar el evento:', error);
        throw error
    }
}

export const eventosUpdate = async (data) => {
    try {
        const response = await axios.put(`${API}/appointment/${data.id}`, data)
        if (response.status === 200) {
            console.log('Evento editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el evento:', error);
        throw error
    }
} 
    