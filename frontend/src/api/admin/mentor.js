import axiosInstance from "../interceptor.js";

export const mentorsList = async () => {
  try {
    const response = await axiosInstance.get(`/admin/user/mentors`);

    return [...response.data?.Mentores];
  } catch (error) {
    console.error("error al ver los mentores:", error);
    throw error;
  }
};

export const mentorPost = async (data) => {
  try {
    const response = await axiosInstance.post(`/mentor/`, data);

    return response;
  } catch (error) {
    console.error("error al cargar mentor: ", error);
    throw error;
  }
};

export const mentorOne = async (id) => {
  try {
    const response = await axiosInstance.get(`/mentor/${id}`);
    // const response = await apiClient.get ('/mentor/${id}')
    //console.log(response.data);
    return response;
  } catch (error) {
    console.error("error al encontrar el mentor:", error);
    throw error;
  }
};

export const mentorDelete = async (id) => {
  try {
    const response = await axiosInstance.delete(`/mentor/${id}`);
    // const response = await apiClient.delete ('/mentor/${id}')
    if (response.status === 200) {
      console.log("mentor borrado exitosamente");
    }
    return response;
  } catch (error) {
    console.error("error al borrar el mentor:", error);
    throw error;
  }
};

export const mentorUpdate = async (data) => {
  try {
    const response = await axiosInstance.put(`/mentor/${data.id}`, data);
    // const response = await apiClient.put ('/mentor/${data.id}',data)
    if (response.status === 200) {
      console.log("mentor editado exitosamente");
    }
    return response;
  } catch (error) {
    console.error("error al editar el mentor:", error);
    throw error;
  }
};
