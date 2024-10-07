import axiosInstance from './interceptor'

export const usuariosEgresadosList= async () => 
{
    try {
        const response =  await axiosInstance.get(`/admin/user/students`)
        return response
    } catch (error) {
        console.error('error al ver los Egresados:', error)
        throw error
    }
}
export const usuariosMentoresList= async () => 
    {
        try {
            const response =  await axiosInstance.get(`/admin/user/mentors`)
            return response
        } catch (error) {
            console.error('error al ver los mentores:', error)
            throw error
        }
    }

    export const usuarioMentorOne = async (id) => 
        {
            try {
                const response =  await axiosInstance.get(`/admin/user/mentor/${id}`)
                return response
            } catch (error) {
                console.error('error al ver el Mentor:', error)
                throw error
            }
        }

        export const usuarioEgresadoOne = async (id) => 
            {
                try {
                    const response =  await axiosInstance.get(`/admin/user/student${id}`)
                    return response
                } catch (error) {
                    console.error('error al ver el Egresado:', error)
                    throw error
                }
            }

export const usuarioMentorPost = async () =>{
    try {
        const response = await axiosInstance.post(`/admin/user/save/mentor`)
        return response
    } catch (error) {
        console.error('error al cargar mentor: ',error)
        throw error
    }
}
export const usuarioEgresadoPost = async () =>{
    try {
        const response = await axiosInstance.post(`/admin/user/save/student`)
        return response
    } catch (error) {
        console.error('error al cargar Egresado: ',error)
        throw error
    }
}


export const usuariosDelete = async (id) => {
    try {
        const response = await axiosInstance.delete(`/admin/users/${id}`)
        if (response.status === 200) {
            console.log('usuario borrado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al borrar el usuario:', error);
        throw error
    }
}

export const usuariosUpdate = async (data) => {
    try {
        const response = await axiosInstance.put(`/users/${data.id}`, data)
        if (response.status === 200) {
            console.log('Usuario editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el usuario:', error);
        throw error
    }
} 
    