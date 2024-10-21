import {
  Container,
  Card,
  Flex,
  Text,
  Button,
  Strong,
  Heading,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "@/api/register";
import Logo from "@/components/Logo";

const Register = () => {
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    registerUser(data, navigate);
  };

  return (
    <div className="flex h-screen">
      <Toaster richColors position="top-center" />

      <div className="flex-1 flex items-center justify-center from-rose-100 from-0% via-transparent via-50% to-blue-100 to-100% bg-gradient-to-r bg-opacity-5">
        <Container
          size="2"
          align="center"
          className="relative h-screen flex justify-center"
        >
          <Logo />
          <div className="text-center py-4">
            <Heading as="h1" size="8" className="w-full">
              Registro
            </Heading>
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
                      <Strong>Nombre:</Strong>
                    </Text>
                    <input
                      style={{
                        width: "100%",
                        border: "2px solid gray",
                        borderRadius: "33px",
                        padding: "7px 10px",
                        outline: "none",
                      }}
                      type="text"
                      name="name"
                      placeholder="Ingrese su nombre"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Correo Electrónico:</Strong>
                    </Text>
                    <input
                      style={{
                        width: "100%",
                        border: "2px solid gray",
                        borderRadius: "33px",
                        padding: "7px 10px",
                        outline: "none",
                      }}
                      type="email"
                      name="email"
                      placeholder="Ingrese su correo electrónico"
                      {...register("email", { required: true })}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Contraseña:</Strong>
                    </Text>
                    <input
                      style={{
                        width: "100%",
                        border: "2px solid gray",
                        borderRadius: "33px",
                        padding: "7px 10px",
                        outline: "none",
                      }}
                      type="password"
                      name="password"
                      placeholder="Ingrese su contraseña"
                      {...register("password", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: "Mínimo 8 caracteres.",
                        },
                      })}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Confirmar Contraseña:</Strong>
                    </Text>
                    <input
                      style={{
                        width: "100%",
                        border: "2px solid gray",
                        borderRadius: "33px",
                        padding: "7px 10px",
                        outline: "none",
                      }}
                      type="password"
                      name="confirmpassword"
                      placeholder="Confirme su contraseña"
                      {...register("confirmpassword", {
                        required: true,
                        validate: (value) => {
                          const { password } = getValues();
                          return (
                            value === password || "Las contraseñas no coinciden"
                          );
                        },
                      })}
                    />
                  </div>
                  <div>
                    <Text as="p" size="2" className="mb-1">
                      <Strong>Rol:</Strong>
                    </Text>
                    <select
                      style={{
                        width: "100%",
                        border: "2px solid gray",
                        borderRadius: "33px",
                        padding: "7px 10px",
                        outline: "none",
                      }}
                      name="rol"
                      {...register("rol", { required: true })}
                    >
                      <option value="" disabled>
                        Seleccione su rol
                      </option>
                      <option value="student">Estudiante</option>
                      <option value="mentor">Mentor</option>
                    </select>
                  </div>
                  <Button className="mt-4 w-full bg-red-800 text-white py-5 rounded-2xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md shadow-black font-bold">
                    Registrarse
                  </Button>
                  <div className="mt-4 text-center">
                    <Text as="p" size="2">
                      ¿Ya tienes una cuenta?{" "}
                      <Link
                        to="/login"
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        Inicia sesión
                      </Link>
                    </Text>
                  </div>
                </Flex>
              </form>
            </Card>
          </Flex>
        </Container>
      </div>
    </div>
  );
};

export default Register;
