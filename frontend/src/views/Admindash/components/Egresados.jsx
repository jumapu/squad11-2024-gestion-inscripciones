import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GiGraduateCap } from "react-icons/gi";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/interceptor.js";

export default function Egresados() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: theme.spacing(1),
    width: "150px",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const [Estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axiosInstance
      .get("admin/user/all")
      .then((result) => {
        const {
          data: { Student:Estudiantes },
        } = result;
        console.log(result)

        if (Estudiantes) {
          setEstudiantes(result.data.Student.Estudiantes);
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
        <GiGraduateCap size={24} style={{ marginRight: "8px" }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6">Egresados</Typography>
          <Typography variant="body2">
            Total:{Estudiantes.length}
          </Typography>
        </Box>
      </Item>

    </Box>
  );
}
