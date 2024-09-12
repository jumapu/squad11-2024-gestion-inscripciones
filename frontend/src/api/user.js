import axios from 'axios'

const API='https://squad-docker.onrender.com/api/v1'
//http://localhost:8080/v3/api-docs

export const usuariosEgresadosList= async () => 
{
    try {
        const response =  await axios.get(`${API}/admin/user/students`)
        return response
    } catch (error) {
        console.error('error al ver los Egresados:', error)
        throw error
    }
}
export const usuariosMentoresList= async () => 
    {
        try {
            const response =  await axios.get(`${API}/admin/user/mentors`)
            return response
        } catch (error) {
            console.error('error al ver los mentores:', error)
            throw error
        }
    }

    export const usuarioMentorOne = async (id) => 
        {
            try {
                const response =  await axios.get(`${API}/admin/user/mentor/${id}`)
                return response
            } catch (error) {
                console.error('error al ver el Mentor:', error)
                throw error
            }
        }

        export const usuarioEgresadoOne = async (id) => 
            {
                try {
                    const response =  await axios.get(`${API}/admin/user/student${id}`)
                    return response
                } catch (error) {
                    console.error('error al ver el Egresado:', error)
                    throw error
                }
            }

export const usuarioMentorPost = async () =>{
    try {
        const response = await axios.post(`${API}/admin/user/save/mentor`)
        return response
    } catch (error) {
        console.error('error al cargar mentor: ',error)
        throw error
    }
}
export const usuarioEgresadoPost = async () =>{
    try {
        const response = await axios.post(`${API}/admin/user/save/student`)
        return response
    } catch (error) {
        console.error('error al cargar Egresado: ',error)
        throw error
    }
}


export const usuariosDelete = async (id) => {
    try {
        const response = await axios.delete(`${API}/admin/users/${id}`)
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
        const response = await axios.put(`${API}/users/${data.id}`, data)
        if (response.status === 200) {
            console.log('Usuario editado exitosamente');
        }
        return response;
    } catch (error) {
        console.error('error al editar el usuario:', error);
        throw error
    }
} 
    