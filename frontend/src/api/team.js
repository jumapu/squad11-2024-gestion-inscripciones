import axios from 'axios'

const API='https://gestioninscripciones.us-east-2.elasticbeanstalk.com/api/v1'
//http://localhost:8080/swagger-ui/index.html#/

export const teamsList= async () => 
{
    try {
        const response =  await axios.get(`${API}/team/`)
        // const response = await apiClient.get ('/team/)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los squads:', error)
        throw error
    }
}

export const teamPost = async (data) =>{
    try {
        const response = await axios.post(`${API}/team/`,data)
        // const response = await apiClient.post ('/team/', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar squad: ',error)
        throw error
    }
}

export const teamOne = async (id) => {
    try {
        const response = await axios.get(`${API}/team/${id}`)
        // const response = await apiClient.get ('/team/${id}')
        //console.log(response.data);
        return response;
    } catch (error) {
        console.error('error al encontrar el squad:', error);
        throw error
    }
}

export const teamDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/team/${id}`)
        // const response = await apiClient.delete ('/team/${id}')
        if (response.status === 200) {
            console.log('squad borrado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al borrar el squad:', error);
        throw error
    }
}

export const teamUpdate = async (data) => {
    try {
        const response = await axios.put(`${API}/team/${data.id}`, data)
        // const response = await apiClient.put ('/team/${data.id}',data)
        if (response.status === 200) {
            console.log('team editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el squad:', error);
        throw error
    }
} 
    