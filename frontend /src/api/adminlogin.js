import axiosInstance from "./interceptor.js";
import { toast } from "sonner";

export const userLogin = async (data, signIn, navigate) => {
    //* Usar Object.entries() para obtener clave e índice
    for (const [key, value] of Object.entries(data)) {
        if (value.trim() === "" || value == null) {
            toast.error(`El campo ${key} está vacío. Falta completar.`);
            return;  // La función termina aquí si hay un campo vacío
        }
    }

    try {
        const res = await axiosInstance.post(`auth/authentication`, data);
        console.log(res);
        
        signIn({
            auth: {
                token: res.data.jwt,  
                type: "Bearer",
            },
            userState: {
                rol: res.data.rol || data?.rol,  // Me aseguro que el rol viene en la respuesta
                email: data?.email,
            },
        });

        // Verificación del rol después de obtener estos datos
        if (res.data.rol === "admin") {
            navigate("/admindash");
        } else {
            toast.error("Este usuario no tiene permisos suficientes para poder acceder");
            navigate("/home");
        }
    } catch (error) {
        console.error("Error durante el login:", error);
        toast.error("Ocurrió un error durante el inicio de sesión. Inténtalo de nuevo.");
    }
}
