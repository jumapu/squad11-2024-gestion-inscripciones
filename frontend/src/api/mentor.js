import axiosInstance from './interceptor.js'

export const mentorsList= async () => 
{
    try {
        const response =  await axiosInstance.get(`admin/user/mentors`)
        // const response = await apiClient.get ('/mentor/)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los mentores:', error)
        throw error
    }
}

export const mentorPost = async (data) =>{
    try {
        const response = await axiosInstance.post(`/admin/user/save/mentor`,data)
        // const response = await apiClient.post ('/mentor/', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar mentor: ',error)
        throw error
    }
}

export const mentorOne = async (id) => {
    try {
        const response = await axiosInstance.get(`/admin/user/mentor/${id}`)
        // const response = await apiClient.get ('/mentor/${id}')
        //console.log(response.data);
        return response;
    } catch (error) {
        console.error('error al encontrar el mentor:', error);
        throw error
    }
}

export const mentorDelete = async (id) => {
    try {
        const response = await axiosInstance.delete(`/admin/user/${id}`)
        // const response = await apiClient.delete ('/mentor/${id}')
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
        const response = await axiosInstance.patch(`/admin/user/mentor/update/`, data)
        // const response = await apiClient.put ('/mentor/${data.id}',data)
        if (response.status === 200) {
            console.log('mentor editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el mentor:', error);
        throw error
    }
} 
    