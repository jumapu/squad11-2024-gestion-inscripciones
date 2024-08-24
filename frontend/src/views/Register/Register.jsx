import { authenticateUser } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./css/register.css";
import { Toaster } from "sonner";
import Logo from "@/assets/logo.webp";
import { Flex, AlertDialog, Button, Link, Text, Strong, Card, Container } from "@radix-ui/themes";

const Register = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    authenticateUser(data, register, navigate);
  };

  return (
    <div>
      <div className="flex flex-col mb-2 register-container">
        <Toaster richColors position="top-center" />
        <Container size="2" className="login-container">
        <div className="w-1/5 bg-[#ade8f4] flex items-center justify-center">
        <img
          src={Logo}
          className="max-w-full max-h-full"
          style={{ maxWidth: "12rem", maxHeight: "12rem" }}
        />
        <span>
          <h1>Registro</h1>
        </span>
      </div>
          <Flex direction="column" gap="2" className="max-w-md mx-auto">
            <Card className="p-10 shadow-lg rounded-lg">
              <form onSubmit={handleSubmit(onSubmit)} >
                <Flex direction="column" gap="6" className="py-8 px-10">
                  <div>
                    <div className="mt-4 flex flex-row space-x-2">
                      <div className="flex-1">
                        <Text as="p" size="2" className="mb-1"><Strong>Nombre de Usuario</Strong></Text>
                        <input style={{ width: "98%", marginBottom: "5px" }}
                          autoComplete="username"
                          className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1"
                          name="name"
                          id="name"
                          required
                          minLength="4"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="mt-4 flex flex-col bg-gray-100 rounded-lg p-4 shadow-sm">
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1"><Strong>Email</Strong></Text>
                          <input style={{ width: "98%", marginBottom: "5px" }}
                            autoComplete="email"
                            pattern=".+@example\.com"
                            size="30"
                            className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1"
                            type="email"
                            id='email'
                            required
                          />
                        </div>
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1"><Strong>Contraseña</Strong></Text>
                          <input style={{ width: "98%", marginBottom: "5px" }}
                            autoComplete="new-password"
                            className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1"
                            type="password"
                            id='password'
                            required
                          />
                        </div>
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1"><Strong>Confirmar Contraseña</Strong></Text>
                          <input style={{ width: "98%", marginBottom: "15px" }}
                            autoComplete="new-password webauthn"
                            className="w-full bg-slate-400 rounded-md border-gray-300 text-black px-2 py-1"
                            type="password"
                            id='confirmpassword'
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button className='mt-4 w-full bg-indigo-600 text-white py-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Guardar</Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Guardar</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Desea guardar los cambios para registrarse?
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Action>
                            <Button variant="solid" className="text-white" style={{ justifyContent: "center" , background:"#1c668f"}}>
                              <Link href="/login">Guardar</Link>
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </div>
                </Flex>
              </form>
            </Card>
          </Flex>
        </Container>
      </div>
    </div>
  )
}

export default Register