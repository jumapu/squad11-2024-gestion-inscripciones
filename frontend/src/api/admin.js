import axios from 'axios'

const API='https://squad-docker.onrender.com/api/v1'
//https://squad-docker.onrender.com/

export const adminsList= async () => 
{
    try {
        const response =  await axios.get(`${API}/admin/`)
        // const response = await apiClient.get ('/admin/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los admin:', error)
        throw error
    }
}

export const adminPost = async (data) =>{
    try {
        const response = await axios.post(`${API}/admin/`,data)
        // const response = await apiClient.post ('/admin/', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar admins: ',error)
        throw error
    }
}

export const adminOne = async (id) => {
    try {
        const response = await axios.get(`${API}/admin/${id}`)
        // const response = await apiClient.get ('/admin/${id}')
        //console.log(response.data);
        return response;
    } catch (error) {
        console.error('error al encontrar el admin:', error);
        throw error
    }
}

export const adminDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/admin/${id}`)
        // const response = await apiClient.delete ('/admin/${id}')
        if (response.status === 200) {
            console.log('admin borrado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al borrar el admin:', error);
        throw error
    }
}

export const adminUpdate = async (data) => {
    try {
        const response = await axios.put(`${API}/admin/${data.id}`, data)
        // const response = await apiClient.put ('/admin/${data.id}',data)
        if (response.status === 200) {
            console.log('Admin editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el admin:', error);
        throw error
    }
} 
