import { useState, useEffect } from "react";
import NavAndDrawer from "../../components/NavAndDrawer";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Toaster } from "sonner";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import axiosInstance from "@/api/interceptor";

const InscritosTable = () => {
  const { id } = useParams();
  const drawerWidth = 240;
  const [inscritos, setInscritos] = useState([]);
  const [nameEvent, setNameEvent] = useState("");
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/event/${id}`);
        if (response?.status === 200 && response?.data?.Event?.registration) {
          const registrationData = response.data.Event.registration;
          console.log(registrationData);

          const combinedData = [
            ...(registrationData.Students || []).map((student) => ({
              id: student.id,
              name: student.name,
              lastName: student.lastName || "Correo no disponible",
              rol: student.rol.join(", ") || "Rol no disponible",
            })),
            ...(registrationData.Mentors || []).map((mentor) => ({
              id: mentor.id,
              name: mentor.name,
              lastName: mentor.lastName || "Correo no disponible",
              rol: mentor.rol.join(", ") || "Rol no disponible",
            })),
          ];
          setInscritos(combinedData);
          setNameEvent(response.data.Event.name);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    };

    fetchEventData();
  }, [id]);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name || "Nombre no disponible",
      sortable: true,
      center: true,
    },
    {
      name: "Apellido",
      selector: (row) => row.lastName || "Apellido no disponible",
      sortable: true,
      center: true,
    },
    {
      name: "Rol",
      selector: (row) => row.rol || "Rol no disponible",
      sortable: true,
      center: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <p className="text-blue-600 hover:underline cursor-pointer">
            Ver Detalles
          </p>
        </div>
      ),
      center: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        sm: { width: "100%" },
      },
    },
    headCells: {
      style: {
        color: "darkblue",
        fontSize: "1rem",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        width: 100,
      },
    },
    rows: {
      style: {
        transition: "background-color 0.3s ease",
      },
      hoverStyle: {
        backgroundColor: "#e0f7fa",
      },
    },
  };

  return (
    <div>
      <Toaster richColors position="top-center" />
      <NavAndDrawer />
      <Box
        component="main"
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "0 1rem", // Add padding for mobile responsiveness
          marginLeft: { sm: `${drawerWidth}px`, xs: 0 }, // Add margin for larger screens
        }}
      >
        <Box
          sx={{
            width: { sm: `calc(100vw - ${drawerWidth}px)`, xs: "100%" }, // Responsive width
            maxWidth: "1440px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <a href="../eventos" className="text-2xl font-extrabold self-start">
            <svg
              className="inline me-4"
              width="14"
              height="26"
              viewBox="0 0 14 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 22.945L5.34683 13L14 3.055L11.336 0L0 13L11.336 26L14 22.945Z"
                fill="black"
              />
            </svg>
            Inscritos al Evento {nameEvent}
          </a>
          <Typography
            variant="h4"
            noWrap
            textAlign={"center"}
            component="div"
            sx={{
              padding: "1.5rem",
              backgroundColor: "white",
              color: "black",
              borderRadius: "8px 8px 0 0",
              marginBottom: "1rem",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          >
            Lista de Inscritos
          </Typography>

          <Box
            sx={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: 3,
              marginTop: "1.5rem",
              paddingBottom: "25px",
              backgroundColor: "#fff",
              border: "3px solid darkblue",
            }}
          >
            {pending ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="300px"
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ width: "100%" }}>
                <DataTable
                  columns={columns}
                  data={inscritos}
                  customStyles={customStyles}
                  pagination
                  paginationPerPage={10}
                  responsive
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default InscritosTable;
