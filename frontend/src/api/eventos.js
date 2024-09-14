import axiosInstance from './interceptor';
//import apiClient from './apiClient';


export const eventosList = async () => {
    
    try {
        const response = await axiosInstance.get(`/v1/admin/event/all`)
        // const response = await apiClient.get ('/evento/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los eventos:', error)
        throw error
    }
}

export const eventosActivos = async () => {
    try {
        const response = await axiosInstance.get(`/v1/admin/event/all/active`)
        // const response = await apiClient.get ('/evento/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los eventos:', error)
        throw error
    }
}

export const eventosNoActivos = async () => {
    try {
        const response = await axiosInstance.get(`/v1/admin/event/all/notActive`)
        // const response = await apiClient.get ('/evento/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los eventos:', error)
        throw error
    }
}

export const eventoGet = async (id) => {
    try {
        const response = await axiosInstance.get(`/v1/admin/event/${id}`)
        // const response = await apiClient.get ('/evento/')
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al ver los eventos:', error)
        throw error
    }
}

export const eventosPost = async (data) => {
    try {
        const response = await axiosInstance.post(`/v1/admin/event/save`, data)
        // const response = await apiClient.post ('/evento', data)
        //console.log(response.data);
        return response
    } catch (error) {
        console.error('error al cargar el evento: ', error)
        throw error
    }
}

export const eventosOne = async (id) => {
    try {
        const response = await axiosInstance.patch(`/v1/admin/event/update/${id}`)
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
        const response = await axiosInstance.delete(`/v1/admin/event/${id}`)
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
        const response = await axiosInstance.patch(`/v1/admin/event/update`, data)
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

export const eventosUpdateOne = async (id, data) => {
    try {
        const response = await axiosInstance.patch(`/v1/admin/event/update/${id}`, data)
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