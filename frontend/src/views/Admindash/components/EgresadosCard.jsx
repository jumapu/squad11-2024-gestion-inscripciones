import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GiGraduateCap } from "react-icons/gi";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/interceptor.js";

export default function EgresadosCard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: theme.spacing(1),
    border: "solid 2px darkblue",
    borderRadius: "21px",
    width: "175px",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const [Estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("admin/user/students")
      .then((result) => {
        const {
          data: { Estudiantes },
        } = result;
        if (Estudiantes) {
          setEstudiantes(Estudiantes);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  [Estudiantes];

  return loading ? (
    <h2>Loading</h2>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Item>
        <GiGraduateCap
          size={32}
          style={{
            color: "white",
            backgroundColor: "red",
            borderRadius: "50%",
          }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Egresados</Typography>
          <Typography variant="body2">Total:{Estudiantes.length}</Typography>
        </Box>
      </Item>
    </Box>
  );
}
