import axiosInstance from './interceptor.js'


export const egresadosList= async () => 
{
    try {
        const response =  await axiosInstance.get(`/admin/user/students`)
        // const response = await apiClient.get ('/egresados/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los egresados:', error)
        throw error
    }
}

export const egresadosImgPost = async (data) =>{
    try {
        const response = await axiosInstance.post(`/student/img`,data)
        // const response = await apiClient.post ('/egresados/', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar imagen: ',error)
        throw error
    }
}

export const egresadosOne = async (id) => {
    try {
        const response = await axiosInstance.get(`/student/get ${id}`)
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
        const response = await axiosInstance.delete(`/student/delete${id}`)
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

export const egresadosUpdate = async () => {
    try {
        const response = await axiosInstance.patch(`/student/update`)
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

export const egresadosPost = async (data) =>{
    try {
        const response = await axiosInstance.post(`/student/post`,data)
        // const response = await apiClient.post ('/egresados/', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar egresado: ',error)
        throw error
    }
}