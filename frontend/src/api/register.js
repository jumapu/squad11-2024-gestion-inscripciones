import axiosInstance from "./interceptor.js";
import { toast } from "sonner";

// Función común para validar campos
const validateFields = (data, requiredFields) => {
  for (const field of requiredFields) {
    if (data[field] === "" || data[field] == null) {
      toast.error(`El campo ${field} está vacío. Es necesario completarlo.`);
      return false;
    }
  }
  return true;
};

// Validación y registro de nuevos egresados
export const registerEgresado = async (data, navigate) => {
  const requiredFields = [
    "name",
    "lastName",
    "email",
    "password",
    "confirmpassword",
  ];

  if (!validateFields(data, requiredFields)) return;

  const { password, confirmpassword } = data;

  if (password !== confirmpassword) {
    toast.error("Las contraseñas no coinciden");
    return;
  }

  if (password.length < 8) {
    toast.error("La contraseña debe ser mayor a 8 caracteres.");
    return;
  }

  try {
    axiosInstance.post(`/auth/register`, data).then((res) => {
      console.log(res);
    });
    navigate("/egresados");
  } catch (error) {
    toast.error("Error en el registro del egresado.");
  }
};

// Validación y registro de nuevos mentores
export const registerMentor = async (data, navigate, selectedOption) => {
  const requiredFields = ["name", "lastName", "company"];

  if (!validateFields(data, requiredFields)) return;

  if (!selectedOption || !selectedOption.value) {
    toast.error("Seleccione el rol de mentor.");
    return;
  }

  try {
    await axiosInstance.post(`/admin/user/save/mentor`, {
      ...data,
      rol: selectedOption.value,
    });
    navigate("/mentores");
  } catch (error) {
    toast.error("Error en el registro del mentor.");
  }
};

// Validación y registro de nuevos eventos
export const registerEvent = async (data, navigate) => {
  const requiredFields = ["nombreEvento", "fecha", "file"];

  // Verifica que la imagen haya sido seleccionada
  if (data.file == null || data.file.length === 0) {
    toast.error("Falta agregar una imagen");
    return;
  }

  if (!validateFields(data, requiredFields)) return;

  try {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("nombreEvento", data.name);
    formData.append("fecha", data.date);

    await axiosInstance.post(`/admin/event/save`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    navigate("/eventos");
  } catch (error) {
    toast.error("Error en el registro del evento.");
  }
};
