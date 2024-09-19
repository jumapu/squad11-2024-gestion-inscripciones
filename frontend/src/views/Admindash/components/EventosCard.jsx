import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoCalendar } from "react-icons/io5";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/interceptor.js";

export default function EventosCard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: theme.spacing(1),
    width: "175px",
    border: "solid 2px blue",
    borderRadius:"21px",
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
  }, []);

   [eventos];
  return loading ? (
    <h2>Loading</h2>
  ) : (
    <Box sx={{ flexGrow: 1 }}>

        <Item>
          <IoCalendar size={32} style={{ color:"white", backgroundColor:"red", borderRadius:"50%", padding:"5px" }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Eventos</Typography>
            <Typography variant="body2">
              Total:{eventos.length}
            </Typography>
          </Box>
        </Item>

    </Box>
  );
}
