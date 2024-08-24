import {
  Container,
  Card,
  Flex,
  Text,
  Button,
  Strong,
  Link,
} from "@radix-ui/themes";
import '@radix-ui/themes/styles.css';
import { authenticateUser } from "@/utils/authUtils";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import "./css/login.css";
import Logo from "@/assets/logo.webp";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    authenticateUser(data, signIn, navigate);
  };

  return (
    <div className="flex h-screen">
      <Toaster richColors position="top-center" />
      <div className="w-1/5 bg-[#ade8f4] flex items-center justify-center">
        <img
          src={Logo}
          className="max-w-full max-h-full"
          style={{ maxWidth: "12rem", maxHeight: "12rem" }}
        />
        <span>
          <h1>Login</h1>
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Container size="2" className="login-container">
          <Flex direction="column" gap="2" className="max-w-md mx-auto">
            <Card style={{margin: "10px 5px"}} className="py-8 px-10 shadow-lg rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} >
                <Flex direction="column" gap="6" className="py-8 px-10">
                <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Nombre de Usuario:</Strong>
                    </Text>
                    <input
                    style={{width: "98%"}}
                      type="text"
                      name="usuario"
                      placeholder="Usuario"
                      className="px-4 py-2 border border-[#57ced4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      {...register("usuario")}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Email:</Strong>
                    </Text>
                    <input
                    style={{width: "98%"}}
                      type="text"
                      name="email"
                      placeholder="Ingrese su email"
                      className="px-4 py-2 border border-[#57ced4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Contraseña:</Strong>
                    </Text>
                    <input
                    style={{width: "98%"}}
                      type="password"
                      name="password"
                      placeholder="Ingrese su contraseña"
                      className="px-4 py-2 border border-[#57ced4] rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      {...register("password")}
                    />
                  </div>
                  <Button className="mt-4 w-full bg-indigo-600 text-white py-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Ingresar
                  </Button>
                  <Text className="crearCuenta">
                    ¿No tienes una cuenta? <Link href="/registro">Crear Cuenta</Link>
                  </Text>
                </Flex>
              </form>
            </Card>
          </Flex>
        </Container>
      </div>
    </div>
  )
}

export default Login

