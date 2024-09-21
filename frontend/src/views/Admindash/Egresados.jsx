import NavAndDrawer from "./components/NavAndDrawer"
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { blue } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import EgresadosTable from "./components/EgresadosTable";

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
  border: 'solid 2px darkblue',
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
  color: theme.palette.getContrastText(blue[600]),
  backgroundColor: blue[900],
  '&:hover': {
    backgroundColor: blue[800],
  },
}));
const OtherButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[600]),
  backgroundColor: red[900],
  '&:hover': {
    backgroundColor: red[800],
  },
  borderRadius:"33px",
  padding: "5px 15px",
}));

const Egresados = () => {
  const drawerWidth = 240;
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
            Egresados
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
                />
              </Search>
              <Box paddingLeft={2}>
                <ColorButton style={{ borderRadius: "25px" }} variant="outlined">BUSCAR</ColorButton>
              </Box>
            </Box>
            <Box
              alignItems={'flex-end'}
              marginRight="50px">
              <OtherButton > + Agregar</OtherButton>
            </Box>
          </Stack>
        </Box>
        <EgresadosTable />
      </Box>

    </div >
  )
}

export default Egresados