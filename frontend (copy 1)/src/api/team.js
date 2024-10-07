import axiosInstance from './interceptor'

export const teamsList= async () => 
{
    try {
        const response =  await axiosInstance.get(`/admin/event/team`)
        // const response = await apiClient.get ('/team/)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los squads:', error)
        throw error
    }
}

export const teamPost = async (id) =>{
    try {
        const response = await axiosInstance.post(`/admin/event/team/create/${id}`)
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
        const response = await axiosInstance.get(`/admin/event/team/${id}`)
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
        const response = await axiosInstance.delete(`/admin/event/team/${id}`)
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

export const teamUpdate = async () => {
    try {
        const response = await axiosInstance.patch(`/admin/event/team/`)
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
    