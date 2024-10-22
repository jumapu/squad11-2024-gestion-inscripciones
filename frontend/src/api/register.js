import { toast } from "sonner";
import axiosInstance from "./interceptor.js";

export const registerUser = async (data, navigate) => {
  const request = {
    email: data.email,
    name: data.name,
    password: data.password,
    rol: data.rol,
  };

  try {
    const res = await axiosInstance.post(`auth/register`, request);

    if (res.status === 201 && res.data.JWT) {
      toast.success("¡Registro Exitoso!");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    }
  } catch (error) {
    if (error?.response.data["404"] == "Email in used") {
      toast.error("¡El email ya se encuentra en uso!");
      return;
    }

    const errorMessage =
      error.response?.data?.message ||
      "Error en el registro. Por favor, intente nuevamente.";
    toast.error(errorMessage);
  }
};

export const registerEvent = async (data, navigate) => {
  const requiredFields = ["nombreEvento", "fecha", "file"];

  if (!data.file || data.file.length === 0) {
    toast.error("Falta agregar una imagen");
    return;
  }

  if (!validateFields(data, requiredFields)) return;

  try {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("nombreEvento", data.nombreEvento);
    formData.append("fecha", data.fecha);

    await axiosInstance.post(`/admin/event/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    navigate("/eventos");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Error en el registro del evento.";
    toast.error(errorMessage);
  }
};
