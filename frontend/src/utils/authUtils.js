import { toast } from "sonner";
import { userLogin } from "@/api/login";

export const authenticateUser = async (data, signIn, navigate) => {
  
  if (!data.email || !data.password) {
    toast.error("Debe completar los campos");
    return;
  }  
    try {
        
      const response = await userLogin(data);
      const { token, user } = response;

      if (
        signIn({
          auth: {
            token: token,
            type: "Bearer",
          },
          userState: {
            usuario: user.usuario,
            email: user.email,
          },
        })
      )
      if (user.role === "admin") {
        navigate("/adminlogin");}    
        if (user.role === "mentor") {
          navigate("/mentordash");
          return;
        } else if (user.role === "egresado") {
          navigate("/egresadodash");
          return;
        } else {
          navigate("/home");
          return;
        }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(
          error.response.data.message || "Los datos ingresados son incorrectos"
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error("No se recibió respuesta del servidor");
      } else {
        console.error("Error:", error.message);
        toast.error("Error al realizar la solicitud de inicio de sesión");
      }
    }
  };
