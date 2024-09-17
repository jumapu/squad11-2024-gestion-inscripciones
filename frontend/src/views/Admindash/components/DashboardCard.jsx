import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoCalendar } from "react-icons/io5";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axiosInstance from "../../../api/interceptor.js";
export default function DashboardCard() {
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

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("admin/event/all")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch("http://localhost:8080/api/v1/admin/event/all", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={2}
        flexWrap={"wrap"}
      ></Box>
    </Box>
  );
}
