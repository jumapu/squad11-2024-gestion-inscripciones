import NavAndDrawer from "./components/NavAndDrawer";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import MentoresTable from "./components/MentoresTable";
import { useState, useEffect } from "react";
import axiosInstance from "@/api/interceptor.js";
import { toast, Toaster } from "sonner";
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

const Egresados = () => {
  const [mentoresOrigin, setMentoresOrigin] = useState([]);
  const [mentores, setMentores] = useState([]);
  const [pending, setPending] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const drawerWidth = 240;
  useEffect(() => {
    const fetchMentores = async () => {
      try {
        const result = await axiosInstance.get("admin/user/mentors");
        const mentores = result.data.Mentores || [];
        setMentoresOrigin(mentores);
        setMentores(mentores);
        setPending(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMentores();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();

    if (!value.trim()) {
      setMentores(mentoresOrigin);
    }
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    const value = searchValue.trim();
    const filter = mentoresOrigin.filter((item) => {
      if (value == item.name || value == item.lastName || value == item.id) {
        return item;
      }
    });

    if (filter.length == 0) {
      toast.error("No se encontraron coincidencias");
      setMentores(mentoresOrigin);
      return;
    }
    setMentores(filter);
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
            Mentores
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
            <Box alignItems={"flex-end"} paddingRight={7}>
              <Button
                style={{
                  borderRadius: "25px",
                  color: "white",
                  padding: "7px 20px",
                  backgroundColor: "red",
                }}
              >
                {" "}
                + Agregar
              </Button>
            </Box>
          </Stack>
        </Box>
        <MentoresTable mentores={mentores} pending={pending} />
      </Box>
    </div>
  );
};

export default Egresados;
