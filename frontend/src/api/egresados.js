import axios from 'axios'

const API='http://gestioninscripciones.us-east-2.elasticbeanstalk.com/'
//http://localhost:8080/swagger-ui/index.html#/

export const egresadosList= async () => 
{
    try {
        const response =  await axios.get(`${API}/egresados/`)
        // const response = await apiClient.get ('/egresados/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los egresados:', error)
        throw error
    }
}

export const egresadosPost = async (data) =>{
    try {
        const response = await axios.post(`${API}/egresados/`,data)
        // const response = await apiClient.post ('/egresados/', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar egresado: ',error)
        throw error
    }
}

export const egresadosOne = async (id) => {
    try {
        const response = await axios.get(`${API}/egresados/${id}`)
        // const response = await apiClient.get ('/egresados/${id}')
        //console.log(response.data);
        return response;
    } catch (error) {
        console.error('error al encontrar el egresado:', error);
        throw error
    }
}

export const egresadosDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/egresados/${id}`)
        // const response = await apiClient.delete ('/egresados/${id}')
        if (response.status === 200) {
            console.log('egresado borrado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al borrar el egresado:', error);
        throw error
    }
}

export const egresadosUpdate = async (data) => {
    try {
        const response = await axios.put(`${API}/egrersados/${data.id}`, data)
        // const response = await apiClient.put ('/egresados/${data.id}',data)
        if (response.status === 200) {
            console.log('Egresado editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el egresado:', error);
        throw error
    }
} 
