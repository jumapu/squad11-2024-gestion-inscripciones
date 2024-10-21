import img from "../assets/error404.png";
import NavAndDrawer from "../views/Admindash/components/NavAndDrawer";
import { Box, Typography } from "@mui/material";

const Error404 = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <NavAndDrawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          p: 10,
          height: "100vh",
        }}
      >
        <div>
          <Typography
            variant="h1"
            className="text-5xl font-bold text-gray-800 mb-4 text-center"
          >
            Oops...
          </Typography>
          <Typography
            variant="h2"
            className="text-3xl font-semibold text-gray-800 mb-2 text-center"
          >
            Página en construcción
          </Typography>
          <img src={img} alt="Página en construcción" className="mb-4" />
        </div>

        <Typography className="text-lg text-gray-600 mb-4">
          Lo sentimos, la página que buscas no está disponible.
        </Typography>
      </Box>
    </div>
  );
};

export default Error404;
