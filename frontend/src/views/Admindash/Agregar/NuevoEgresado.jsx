import { Box, Typography, Modal, Button } from "@mui/material";
import { Flex, Text, Strong, Card, Container } from "@radix-ui/themes";
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { red } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/api/register";
import { Toaster } from "sonner";
import Select from "react-select";

const style = {
    display: "flex",
    flexDirection:"column",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    border:"2ox solid gray",
    borderRadius:"33px",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

const OtherButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[900],
    '&:hover': {
        backgroundColor: red[600],
    },
    borderRadius: "33px",
    padding: "5px 15px",
}));

const CancelButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[700]),
    backgroundColor: red[300],
    '&:hover': {
        backgroundColor: red[200],
    },
    borderRadius: "33px",
    padding: "5px 15px",
}));

export default function NuevoEgresado() {

    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '2px',
            border: '2px solid gray',
            borderRadius: "33px",
            outline: "none",
            boxShadow: '0 2px 4px rgba(0,0,0,.2)',
            ringOffsetColor: "none",
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
        console.log(data);
    };
    const options = [
        { value: "QA", label: "QA" },
        { value: "Frontend", label: "Frontend" },
        { value: "Backend", label: "Backend" },
        { value: "UX/UI", label: "UX/UI" },
        { value: "DevOps", label: "DevOps" },
        { value: "PM", label: "PM" },
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <OtherButton onClick={handleOpen}> + Agregar </OtherButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" paddingLeft="45px">
                        Agregar Nuevo Egresado
                    </Typography>                    
                        <div className="flex flex-col mb-2 justify-center items-center md:flex-shrink">
                            <Toaster richColors position="top-center" />
                            <Container size="1" align="center" className="relative flex">
                                <Flex direction="column" gap="2" className="max-w-md mx-auto">
                                    <Card className="p-6">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Flex direction="column" gap="4" className="py-2 px-4">
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
                                                                <Strong>Nombre Completo</Strong>
                                                            </Text>
                                                            <input
                                                                style={{ width: "50%", border: "2px solid gray", borderRadius: "33px", padding: "5px 10px", outline: "none", marginBottom: "5px", flexWrap:"wrap" }}
                                                                autoComplete="name"
                                                                name="name"
                                                                id="name"
                                                                minLength="4"
                                                                type="text"
                                                                placeholder="Nombre"
                                                                {...register("name")}
                                                            />
                                                            <input
                                                                style={{ width: "50%", border: "2px solid gray", borderRadius: "33px", padding: "5px 10px", outline: "none", marginBottom: "5px" }}
                                                                autoComplete="surname"
                                                                name="surname"
                                                                id="surname"
                                                                minLength="4"
                                                                type="text"
                                                                placeholder="Apellido"
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
                                                                    style={{ width: "100%", border: "2px solid gray", borderRadius: "33px", padding: "5px 10px", outline: "none", marginBottom: "5px" }}
                                                                    autoComplete="email"
                                                                    size="30"
                                                                    type="email"
                                                                    id="email"
                                                                    placeholder="alguien@ejemplo.com"
                                                                    {...register("email")}
                                                                />
                                                            </div>
                                                            <div className="mt-4">
                                                                <Text as="p" size="2" className="mb-1">
                                                                    <Strong>Contraseña</Strong>
                                                                </Text>
                                                                <input
                                                                    style={{ width: "100%", border: "2px solid gray", borderRadius: "33px", padding: "5px 10px", outline: "none", marginBottom: "5px" }}
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
                                                                    style={{ width: "100%", border: "2px solid gray", borderRadius: "33px", padding: "5px", outline: "none", marginBottom: "5px" }}
                                                                    autoComplete="new-password"
                                                                    type="password"
                                                                    id="confirmpassword"
                                                                    required
                                                                    {...register("confirmpassword")}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} gap={2}>
                                                        <CancelButton>
                                                            Cancelar
                                                        </CancelButton>
                                                        <OtherButton >
                                                            Guardar
                                                        </OtherButton>
                                                    </Box>
                                                </div>
                                            </Flex>
                                        </form>
                                    </Card>
                                </Flex>
                            </Container>
                        </div>

                </Box>
            </Modal>
        </div>
    );
}

