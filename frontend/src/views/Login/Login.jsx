import {
  Container,
  Card,
  Flex,
  Text,
  Button,
  Strong,
  Heading
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
//import { authenticateUser } from "@/utils/authUtils";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import Logo from "@/components/Logo";
import { userLogin } from "@/api/login";

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

      <div className="flex-1 flex items-center justify-center from-rose-100 from-0% via-transparent via-50% to-blue-100 to-100% bg-gradient-to-r bg-opacity-5">
        <Container size="2" align="center" className="relative h-screen flex justify-center">
          <Logo/>
          <div className="text-center py-4">
            <Heading as="h1" size="8" className="w-full">Iniciar Sesión</Heading>
          </div>
          <Flex direction="column" gap="2" className="max-w-md mx-auto">
            <Card
              style={{ margin: "10px 5px" }}
              className="py-4 px-6 shadow-lg rounded-3xl"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="6" className="py-8 px-10">
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Correo Electrónico:</Strong>
                    </Text>
                    <input                    
                      style={{ width: "100%", border:"2px solid gray", borderRadius: "33px", padding:"7px 10px", outline: "none" }}
                      type="text"
                      name="email"
                      placeholder="Ingrese su correo electrónico"
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Contraseña:</Strong>
                    </Text>
                    <input
                      style={{ width: "100%", border:"2px solid gray", borderRadius: "33px", padding:"7px 10px", outline: "none" }}
                      type="password"
                      name="password"
                      placeholder="Ingrese su contraseña"
                      {...register("password")}
                    />
                  </div>
                  <Button className="mt-4 w-full bg-red-800 text-white py-5 rounded-2xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md shadow-black font-bold">
                    Ingresar
                  </Button>
                  {/* <Text className="w-full text-center">
                    ¿No tienes una cuenta?{" "}
                    <Link href="/registro">Crear Cuenta</Link>
                  </Text> */}
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
