import { Box, Typography, Modal, Button } from "@mui/material";
import { Flex, Text, Strong, Card, Container } from "@radix-ui/themes";
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { red } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerEvent } from "@/api/register";
import { Toaster } from "sonner";

const style = {
    display: "flex",
    flexDirection: "column",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    border: "2px solid gray",
    borderRadius: "33px",
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

export default function NuevoEvento() {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCancel = () => {
        reset(); // Reseteo el formulario
        setOpen(false); // Cierro el modal
        setSelectedOption(null); // Limpio la selección de opción
        setSelectedFile(undefined); // Reseteo la imagen
    };

    // Create preview
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }
        
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // Libera memoria 
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    const onSubmit = (data) => {
        registerEvent(data, selectedOption).then(() => {
            navigate("/eventos");
        });
        console.log(data);
    };
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
                        Agregar Nuevo Evento
                    </Typography>
                    <div className="flex flex-col mb-2 justify-center items-center md:flex-shrink">
                        <Toaster richColors position="top-center" />
                        <Container size="1" align="center" className="relative flex">
                            <Flex direction="column" gap="2" className="max-w-md mx-auto">
                                <Card className="p-6">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Flex direction="column" gap="4" className="py-2 px-4">
                                            <div>
                                                <div className="mt-4 flex flex-row space-x-2">
                                                    <div className="flex-1">
                                                        <Text as="p" size="2" className="mb-1">
                                                            <Strong>Nombre</Strong>
                                                        </Text>
                                                        <input
                                                            style={{ width: "100%", border: "2px solid gray", borderRadius: "33px", padding: "5px 10px", outline: "none", marginBottom: "5px", flexWrap: "wrap" }}
                                                            autoComplete="nombreEvento"
                                                            name="nombreEvento"
                                                            id="nombreEvento"
                                                            minLength="4"
                                                            type="text"
                                                            placeholder="Nombre del Evento"
                                                            {...register("nombreEvento")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col mb-2">
                                                    <div className="flex flex-col rounded-lg shadow-sm">
                                                        <div className="mt-4">
                                                            <Text as="p" size="2" className="mb-1">
                                                                <Strong>Fecha de Creación</Strong>
                                                            </Text>
                                                            <input
                                                                style={{ width: "100%", border: "2px solid gray", borderRadius: "33px", padding: "5px 10px", outline: "none", marginBottom: "5px" }}
                                                                autoComplete="fecha"
                                                                type="date"
                                                                aria-valuetext="fecha"
                                                                id="fecha"
                                                                {...register("fecha")}
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <Text as="p" size="2" className="mb-1">
                                                                <Strong>Imagen</Strong>
                                                            </Text>
                                                            <input
                                                                style={{ width: "100%", border: "2px solid gray", borderRadius: "33px", padding: "5px 10px", outline: "none", marginBottom: "5px" }}
                                                                autoComplete="file"
                                                                name="file"
                                                                type="file"
                                                                accept="image/png, image/webp, image/jpeg"
                                                                id="file"
                                                                onChange={onSelectFile}
                                                                {...register("file")}
                                                            /> 
                                                            {selectedFile && 
                                                                <img 
                                                                    src={preview} 
                                                                    alt="Preview" 
                                                                    style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px'}} 
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} gap={2}>
                                                    <CancelButton onClick={handleCancel} >
                                                        Cancelar
                                                    </CancelButton>
                                                    <OtherButton type="submit">
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
