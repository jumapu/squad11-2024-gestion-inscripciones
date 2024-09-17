import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IoCalendar } from "react-icons/io5";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function DashboardCard() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: theme.spacing(1),
        width: "150px",
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }));

    const [eventos, setEventos] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchEventosApi = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const endpoint = 'http://localhost:8080/api/v1/admin/event/all?format=json';
                const response = await fetch(endpoint);
                console.log(response);
                if (!response.ok) {
                    throw new Error("Error en la peticion");
                }
                const data = await response.json();
                setEventos(data);
            } catch (error) {
                setError("Hubo un error");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchEventosApi();
    }, []);

    const eventoCount = eventos.length;

    const datos = [
        { icon: <IoCalendar />, text: "Eventos", total: eventoCount },
    ];

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box display={"flex"} flexDirection={"row"} gap={2} flexWrap={"wrap"}>
                {datos.map((item, index) => (
                    <Box key={index}>
                        <Item>
                            <Box>
                                {item.icon}
                            </Box>
                            <Box>
                                <Typography>{item.text}</Typography>
                                <Typography>{item.total}</Typography>
                            </Box>
                        </Item>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
