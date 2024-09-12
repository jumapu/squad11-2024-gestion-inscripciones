import axiosInstance from "./interceptor.js";

export const adminsList = async () => {
  const response = await axiosInstance.get(`/admin/`);

  return response;
};

export const adminPost = async (data) => {
  const response = await axiosInstance.post(`/admin/`, data);

  return response;
};

export const adminOne = async (id) => {
  const response = await axiosInstance.get(`/admin/${id}`);
};

export const adminDelete = async (id) => {
  const response = await axiosInstance.delete(`/admin/${id}`);

  return response;
};

export const adminUpdate = async (data) => {
  const response = await axiosInstance.put(`/admin/${data.id}`, data);
};
