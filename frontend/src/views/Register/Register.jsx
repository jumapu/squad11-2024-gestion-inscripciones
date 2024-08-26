import "./css/register.css";
import { Toaster } from "sonner";
import Logo from "@/assets/logo.webp";
import { Flex, Button, Text, Strong, Card, Container } from "@radix-ui/themes";
import { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { authenticateUser } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    authenticateUser(data, navigate);    
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "mentor", label: "Mentor/a" },
    { value: "student", label: "Egresado/a" },
  ];  
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="6" className="py-8 px-10">
                  <div>
                    <div>
                      <Select
                        className="campos"
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                      />
                    </div>
                    <div className="mt-4 flex flex-row space-x-2">
                      <div className="flex-1">
                        <Text as="p" size="2" className="mb-1"><Strong>Nombre de Usuario</Strong></Text>
                        <input style={{ width: "98%", marginBottom: "5px" }}
                          autoComplete="username"
                          className="campos"
                          name="name"
                          id="name"
                          minLength="4"
                          type="text"
                          {...register("usuario")}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="mt-4 flex flex-col bg-gray-100 rounded-lg p-4 shadow-sm">
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1"><Strong>Email</Strong></Text>
                          <input style={{ width: "98%", marginBottom: "5px" }}
                            autoComplete="email"
                            size="30"
                            className="campos"
                            type="email"
                            id='email'
                            {...register("email")}
                          />
                        </div>
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1"><Strong>Contraseña</Strong></Text>
                          <input style={{ width: "98%", marginBottom: "5px" }}
                            autoComplete="new-password"
                            className="campos"
                            type="password"
                            id='password'
                            {...register("password")}
                          />
                        </div>
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1"><Strong>Confirmar Contraseña</Strong></Text>
                          <input style={{ width: "98%", marginBottom: "15px" }}
                            autoComplete="new-password"
                            className="campos"
                            type="password"
                            id='confirmpassword'
                            required
                            {...register("confirmpassword")}
                          />
                        </div>
                      </div>
                    </div>               
                    <Button className="mt-4 w-full bg-indigo-600 text-white py-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                   Guardar
                  </Button>
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