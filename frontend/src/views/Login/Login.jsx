import {
  Container,
  Card,
  Flex,
  Text,
  Button,
  Strong,
  Link,
  Heading
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
//import { authenticateUser } from "@/utils/authUtils";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import "./css/login.css";
import Logo from "@/assets/logo.webp";
import { userLogin } from "../../api/login";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    userLogin(data, signIn, navigate);
  };

  return (
    <div className="flex h-screen">
      <Toaster richColors position="top-center" />

      <div className="flex-1 flex items-center justify-center">
        <Container size="2" align="center" className="relative overflow-hidden h-full flex justify-center">
          <div className="w-1/5 flex items-center justify-center">
            <img
              src={Logo}
              className="max-w-full max-h-full"
              style={{ maxWidth: "12rem", maxHeight: "12rem" }}
            />

          </div>
          <div className="text-center py-4">
            <Heading as="h1" size="8" className="w-full">Iniciar Sesion</Heading>
          </div>
          <Flex direction="column" gap="2" className="max-w-md mx-auto">
            <Card
              style={{ margin: "10px 5px" }}
              className="py-8 px-10 shadow-lg rounded-lg"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="6" className="py-8 px-10">
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Email:</Strong>
                    </Text>
                    <input
                    
                      style={{ width: "98%" }}
                      type="text"
                      name="email"
                      placeholder="Ingrese su email"
                      className="campos"
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Contraseña:</Strong>
                    </Text>
                    <input
                      style={{ width: "98%" }}
                      type="password"
                      name="password"
                      placeholder="Ingrese su contraseña"
                      className="campos"
                      {...register("password")}
                    />
                  </div>
                  <Button className="mt-4 w-full bg-sky-800 text-white py-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 shadow-md shadow-black">
                    Ingresar
                  </Button>
                  <Text className="crearCuenta">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/registro">Crear Cuenta</Link>
                  </Text>
                </Flex>
              </form>
            </Card>
          </Flex>
        </Container>
      </div>
    </div>
  );
};

export default Login;
