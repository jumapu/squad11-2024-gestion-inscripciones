import axios from 'axios';
//import apiClient from './apiClient';

const API='https://gestioninscripciones.us-east-2.elasticbeanstalk.com/api/v1'
//http://localhost:8080/swagger-ui/index.html#/

export const eventosList= async () => 
{
    try {
        const response =  await axios.get(`${API}/evento/`) 
        // const response = await apiClient.get ('/evento/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los eventos:', error)
        throw error
    }
}

export const eventosPost = async (data) =>{
    try {
        const response = await axios.post(`${API}/evento/`,data)
        // const response = await apiClient.post ('/evento', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar el evento: ',error)
        throw error
    }
}

export const eventosOne = async (id) => {
    try {
        const response = await axios.get(`${API}/evento/${id}`)
        // const response = await apiClient.get ('/evento/${id}')
        //console.log(response.data);
        return response;
    } catch (error) {
        console.error('error al encontrar el evento:', error);
        throw error
    }
}

export const eventosDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/evento/${id}`)
         // const response = await apiClient.delete ('/evento/${id}')
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
        const response = await axios.put(`${API}/evento/${data.id}`, data)
         // const response = await apiClient.put ('/evento/${data.id}',data)
        if (response.status === 200) {
            console.log('Evento editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el evento:', error);
        throw error
    }
} 
    