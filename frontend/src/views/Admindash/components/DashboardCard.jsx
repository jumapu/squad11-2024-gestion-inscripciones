import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { IoCalendar } from "react-icons/io5";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/interceptor.js";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("admin/event/all")
      .then((result) => {
        /*         console.log(result);
        console.log(result?.data);
        console.log(result?.data?.Events);
        console.log(result?.data?.Events.length); */

        const {
          data: { Events: events },
        } = result;
        console.log(events);

        if (events != null) {
          setEventos(events);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .get("admin/user/all")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(eventos);
  }, [eventos]);

  return loading ? (
    <h2>Loading</h2>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <Stack>
        <Item>
          <IoCalendar size={24} style={{ marginRight: "8px" }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Eventos</Typography>
            <Typography variant="body2">Total:{eventos?.length}</Typography>
          </Box>
        </Item>
      </Stack>
    </Box>
  );
}
