import { Toaster } from "sonner";
import Logo from "@/components/Logo";
import { Flex, Button, Text, Strong, Card, Container, Heading } from "@radix-ui/themes";
import { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
//import { authenticateUser } from "@/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/register";
const Register = () => {

  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: '2px',
      border: '2px solid gray',
      borderRadius: "33px",
      outline: "none",
      boxShadow: '0 2px 4px rgba(0,0,0,.2)',
      ringOffsetColor:"none",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#99292C' : 'white',
      borderRadius: "33px",
    }),
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    registerUser(data, navigate, selectedOption);
  };
  const options = [
    { value: "mentor", label: "Mentor/a" },
    { value: "student", label: "Egresado/a" },
  ];
  return (

      <div className="flex flex-col mb-2 h-screen justify-center items-center md:flex-shrink">
        <Toaster richColors position="top-center" />
        <Container size="1" align="center" className="relative flex">
          <Logo/>
          <div className="text-center p-2">
            <Heading as="h1" size="7" >Registrarse</Heading>
          </div>
          <Flex direction="column" gap="2" className="max-w-md mx-auto max-h-screen">
            <Card className="p-6 shadow-lg rounded-3xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="6" className="py-2 px-4">
                  <div>
                    <div >
                      <Select 
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        options={options}
                        styles={customStyles}
                        placeholder="Selecciona"
                      />
                    </div>
                    <div className="mt-4 flex flex-row space-x-2">
                      <div className="flex-1">
                        <Text as="p" size="2" className="mb-1">
                          <Strong>Nombre de Usuario</Strong>
                        </Text>
                        <input
                          style={{ width: "100%", border:"2px solid gray", borderRadius: "33px", padding:"5px", outline: "none", marginBottom: "5px" }}
                          autoComplete="username"
                          name="name"
                          id="name"
                          minLength="4"
                          type="text"
                          {...register("name")}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mb-2">
                      <div className="flex flex-col rounded-lg shadow-sm">
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1">
                            <Strong>Correo Electrónico</Strong>
                          </Text>
                          <input
                            style={{ width: "100%", border:"2px solid gray", borderRadius: "33px", padding:"5px", outline: "none", marginBottom: "5px" }}
                            autoComplete="email"
                            size="30"
                            type="email"
                            id="email"
                            {...register("email")}
                          />
                        </div>
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1">
                            <Strong>Contraseña</Strong>
                          </Text>
                          <input
                            style={{ width: "100%", border:"2px solid gray", borderRadius: "33px", padding:"5px", outline: "none", marginBottom: "5px" }}
                            autoComplete="new-password"
                            className="campos"
                            type="password"
                            id="password"
                            {...register("password")}
                          />
                        </div>
                        <div className="mt-4">
                          <Text as="p" size="2" className="mb-1">
                            <Strong>Confirmar Contraseña</Strong>
                          </Text>
                          <input
                            style={{ width: "100%", border:"2px solid gray", borderRadius: "33px", padding:"5px", outline: "none", marginBottom: "5px" }}
                            autoComplete="new-password"
                            className="campos"
                            type="password"
                            id="confirmpassword"
                            required
                            {...register("confirmpassword")}
                          />
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4 w-full bg-red-800 text-white py-5 rounded-3xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md shadow-black font-medium text-base">
                      Guardar
                    </Button>
                  </div>
                </Flex>
              </form>
            </Card>
          </Flex>
        </Container>
      </div>
  );
};

export default Register;
