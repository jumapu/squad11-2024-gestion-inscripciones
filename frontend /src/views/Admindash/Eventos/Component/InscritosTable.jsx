import { useState, useEffect } from "react";
import NavAndDrawer from "../../components/NavAndDrawer";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
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

          const combinedData = [
            ...(registrationData.Students || []).map((student) => ({
              id: student.id,
              name: student.name,
              email: student.email || "Correo no disponible",
              rol: student.rol.join(", ") || "Rol no disponible",
            })),
            ...(registrationData.Mentors || []).map((mentor) => ({
              id: mentor.id,
              name: mentor.name,
              email: mentor.email || "Correo no disponible",
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
    },
    {
      name: "Correo",
      selector: (row) => row.email || "Correo no disponible",
    },
    {
      name: "Rol",
      selector: (row) => row.rol || "Rol no disponible",
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <p className="text-blue-600 hover:underline">Ver Detalles</p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Toaster richColors position="top-center" />
      <NavAndDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, display: "flex", justifyContent: "center" }}
      >
        <Box
          sx={{
            width: { sm: `calc(100vw - ${drawerWidth}px)` },
            maxWidth: "1440px",
            flex: 1,
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

          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: "8px",
              boxShadow: 3,
              marginTop: "1.5rem",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              textAlign={"center"}
              component="div"
              sx={{
                padding: "1.5rem",
                backgroundColor: "#1976d2",
                color: "white",
                borderRadius: "8px 8px 0 0",
              }}
            >
              Lista de Inscritos
            </Typography>

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
              <Paper elevation={0}>
                <DataTable
                  columns={columns}
                  data={inscritos}
                  pagination
                  paginationPerPage={10}
                  responsive
                  highlightOnHover
                  pointerOnHover
                  striped
                  customStyles={{
                    rows: {
                      style: {
                        minHeight: "50px",
                      },
                    },
                    headCells: {
                      style: {
                        backgroundColor: "#e3f2fd",
                        fontWeight: "bold",
                      },
                    },
                    cells: {
                      style: {
                        padding: "10px",
                      },
                    },
                  }}
                />
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default InscritosTable;
