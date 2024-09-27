import NavAndDrawer from "./components/NavAndDrawer";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import EgresadosTable from "./components/EgresadosTable";
import { useState, useEffect } from "react";
import axiosInstance from "@/api/interceptor.js";
import { toast, Toaster } from "sonner";
import NuevoEgresado from "./Agregar/NuevoEgresado";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  border: "solid 1px blue",
  borderRadius: "25px",
  width: "250px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue[900]),
  backgroundColor: blue[900],
  "&:hover": {
    backgroundColor: blue[600],
  },
}));
//   color: theme.palette.getContrastText(red[600]),
//   backgroundColor: red[900],
//   '&:hover': {
//     backgroundColor: red[600],
//   },
//   borderRadius:"33px",
//   padding: "5px 15px",
// }));

const Egresados = () => {
  const drawerWidth = 240;

  const [estudiantes, setEstudiantes] = useState([]);
  const [pending, setPending] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [estudiantesOrigin, setEstudiantesOrigin] = useState([]);

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const result = await axiosInstance.get("admin/user/students");

        const estudiantes = result?.data?.Estudiantes || [];
        setEstudiantes(estudiantes);
        setEstudiantesOrigin(estudiantes);
        setPending(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEstudiantes();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();

    if (!value.trim()) {
      setEstudiantes(estudiantesOrigin);
    }
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const value = searchValue.trim();
    const filter = estudiantesOrigin.filter((item) => {
      if (value == item.name || value == item.lastName || value == item.id) {
        return item;
      }
    });

    if (filter.length == 0) {
      toast.error("No se encontraron coincidencias");
      setEstudiantes(estudiantesOrigin);
      return;
    }
    setEstudiantes(filter);
  };
  return (
    <div>
      <Toaster richColors position="top-center" />
      <div>
        <NavAndDrawer />
      </div>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box
          sx={{
            width: { sm: `calc(100vw - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            maxWidth: "1440px",
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              padding: "1.5rem",
              gap: "2rem",
            }}
          >
            Egresados
          </Typography>
          <Stack
            display={"flex"}
            flexDirection={"row"}
            alignItems={{ sm: "center" }}
            justifyContent={{ xs: "center", md: "space-between" }}
            maxWidth="1440px"
            flexWrap={"wrap"}
            gap={2}
          >
            <Box as="div" display={"flex"} alignItems={"center"}>
              <Search>
                <StyledInputBase
                  placeholder="Buscar .."
                  inputProps={{ "aria-label": "search" }}
                  value={searchValue}
                  onChange={handleInputChange}
                />
              </Search>
              <Box paddingLeft={2}>
                <ColorButton
                  style={{ borderRadius: "25px" }}
                  variant="outlined"
                  onClick={handleSearchClick}
                >
                  BUSCAR
                </ColorButton>
              </Box>
            </Box>
            <Box
              alignItems={'flex-end'}
              marginRight="50px">
              <NuevoEgresado/>
            </Box>
          </Stack>
        </Box>
        <EgresadosTable students={estudiantes} pending={pending} />
      </Box>
    </div>
  );
};

export default Egresados;
