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
  import Logo from "@/components/Logo";
  import { userLogin } from "@/api/login";
  
  const AdminLogin = () => {
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
          <Container size="2" align="center" className="relative h-screen flex justify-center bg-sky-200">
            <Logo/>
            <div className="text-center py-4">
              <Heading as="h1" size="8" className="w-full text-sky-900" >Iniciar Sesión</Heading>
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
                        className="campos"
                        {...register("email")}
                        required
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
                        className="campos"
                        {...register("password")}
                        required
                      />
                    </div>
                    <Button className="mt-4 w-full bg-red-800 py-5 rounded-3xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md font-bold shadow-black">                      
                      <Link className=" text-white" href="/Dashboard">Ingresar</Link>
                    </Button>
                  </Flex>
                </form>
              </Card>
            </Flex>
          </Container>
        </div>
      </div>
    );
  };
  
  export default AdminLogin;
  