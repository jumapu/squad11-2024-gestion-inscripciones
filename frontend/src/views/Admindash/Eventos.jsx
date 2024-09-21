import NavAndDrawer from "./components/NavAndDrawer"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import { EventosTable } from "./components/EventosTable";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/interceptor.js";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    border: 'solid 1px blue',
    borderRadius: '25px',
    width: '250px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    '&:hover': {
        backgroundColor: blue[600],
    },
}));

 const Eventos = () => {
    const drawerWidth = 240;

    const [search, setSearch] = useState("");
    const [eventos, setEventos] = useState([]); // Declarar el estado para eventos
    const [filteredEventos, setFilteredEventos] = useState([]); // Estado para los eventos filtrados

    useEffect(() => {
        axiosInstance
            .get("admin/event/all")
            .then((result) => {
                const {
                    data: { Events: events },
                } = result;
                console.log(events);

                if (events != null) {
                    setEventos(events);
                    setFilteredEventos(events); // Inicialmente, mostrar todos los eventos.
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value); // Actualiza el valor de búsqueda

        // Filtrar los eventos según el valor de búsqueda
        const filtered = eventos.filter((evento) => 
            evento.name.toUpperCase().includes(value.toUpperCase())
        );
        setFilteredEventos(filtered);
    };


return (
    <div>
        <div>
            <NavAndDrawer />
        </div>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3 }}
        >
            <Box sx={{
                width: { sm: `calc(100vw - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                maxWidth: "1440px",
            }}>
                <Typography
                    variant="h6" noWrap component="div"
                    sx={{
                        padding: "1.5rem",
                        gap: "2rem",
                    }}
                >
                    Eventos
                </Typography>
                <Stack
                    display={'flex'}
                    flexDirection={'row'}
                    alignItems={{ sm: 'center' }}
                    justifyContent={{ xs: "center", md: 'space-between' }}
                    maxWidth="1440px"
                    flexWrap={'wrap'}
                    gap={2}
                >
                    <Box
                        as="div"
                        display={'flex'}
                        alignItems={'center'}
                    >
                        <Search>
                            <StyledInputBase
                                placeholder="Buscar .."
                                inputProps={{ 'aria-label': 'search' }}
                                type="text"
                                value={search}
                                
                            />
                        </Search>
                        <Box paddingLeft={2}>
                            <ColorButton style={{ borderRadius: "25px" }} 
                            variant="outlined" onChange={handleChange} >BUSCAR</ColorButton>
                        </Box>
                    </Box>
                    <Box
                        alignItems={'flex-end'}
                        marginRight="50px">
                        <Button style={{ borderRadius: "25px", color: "white", padding: "7px 20px", backgroundColor: "red" }}> + Agregar</Button>
                    </Box>
                </Stack>
            </Box>
            <EventosTable eventos={filteredEventos} />
        </Box>

    </div >
);
}
export default Eventos