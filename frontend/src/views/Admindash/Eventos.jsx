import NavAndDrawer from "./components/NavAndDrawer";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { toast, Toaster } from "sonner";
import { blue } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import { EventosTable } from "./components/EventosTable";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/interceptor.js";
import NuevoEvento from "./Agregar/NuevoEvento";

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
  border: "solid 2px darkblue",
  borderRadius: "33px",
  width: "250px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
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

const Eventos = () => {
  const drawerWidth = 240;

  const [search, setSearch] = useState("");
  const [eventos, setEventos] = useState([]);
  const [filteredEventos, setFilteredEventos] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("admin/event/all")
      .then((result) => {
        const {
          data: { Events: events },
        } = result;

        if (events != null) {
          setEventos(events);
          setFilteredEventos(events);
          setPending(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInputChange = (event) => {
    const value = event.target?.value?.trim();

    if (!value.trim()) {
      setFilteredEventos(eventos);
    }
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    const value = search.toLowerCase().trim();
    const filter = eventos.filter((item) => {
      if (
        item?.name?.toLowerCase().includes(value) ||
        item?.lastName?.toLowerCase()?.includes(value) ||
        value == item.id
      ) {
        return item;
      }
    });

    if (filter.length == 0) {
      toast.error("No se encontraron coincidencias");
      setFilteredEventos(eventos);
      return;
    }
    setFilteredEventos(filter);
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
            Eventos
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
                  type="text"
                  value={search}
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
            <Box alignItems={"flex-end"} marginRight="50px">
              <NuevoEvento />
            </Box>
          </Stack>
        </Box>
        <EventosTable eventos={filteredEventos} loading={pending} />
      </Box>
    </div>
  );
};
export default Eventos;
