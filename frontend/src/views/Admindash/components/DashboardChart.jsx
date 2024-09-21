import { PieChart } from "@mui/x-charts/PieChart";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DashboardCalendar from "./DashboardCalendar";
import axiosInstance from "@/api/interceptor.js";
import { useEffect, useState } from "react";

export default function DashboardChart() {
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(true);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
    border: '2px solid darkblue',
    borderRadius: '21px',
    flexGrow: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  useEffect(() => {
    axiosInstance
      .get("admin/user/students")
      .then((result) => {
        console.log(result.data);
        const roles = {};        
        for (const element of result.data.Estudiantes) {
            const rolesEstudiante = Array.isArray(element.rol)?element.rol:[element.rol];
        //   const { rol } = element;
          rolesEstudiante.forEach((item) => {
            if (item in roles) {
              roles[item] += 1;
            } else {
              roles[item] = 1;
            }
          });
        }

        const rolesArray = Object.keys(roles).map((key, index) => ({
          id: index,
          value: roles[key],
          label: key,
        }));

        setChart(rolesArray);
        setLoading(false);
        console.log(rolesArray);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <h2>loading</h2>
  ) : (
    <Box
      display={"flex"} 
    >
      <Box 
      display={"flex"}
      flexWrap={"wrap"}
      flexGrow={1}
      marginTop={3}
      justifyContent={"center"}
      alignItems={"start"}
      gap={2}
      >
        
        <Item>
          <Typography>Egresados - Géneros</Typography>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Masculinos" },
                  { id: 1, value: 15, label: "Femeninos" },
                ],
              },
            ]}
            {...pieParams}
          />
        </Item>
        <Item>
          <Typography>Egresados - Roles</Typography>
          <PieChart
            series={[
              {
                data: chart,
              },
            ]}
            {...pieParams}
          />
        </Item>
        <DashboardCalendar />
      </Box>
      
    </Box>
  );
}

const pieParams = {
  height: 200,
  margin: { right: 5 },
  slotProps: { legend: { hidden:true}},
};