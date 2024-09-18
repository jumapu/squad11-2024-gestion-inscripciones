import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IoCalendar } from "react-icons/io5";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axiosInstance from "@/api/interceptor.js";

export default function Mentores() {
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

  const [Mentores, setMentores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("admin/user/all")
      .then((result) => {
        const {
          data: { Mentors },
        } = result;
        console.log(Mentors);

        if (Mentors != null) {
          setMentores(Mentors);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
//    [mentores];
   
  return loading ? (
    <h2>Loading</h2>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
 
        <Item>
          <IoCalendar size={24} style={{ marginRight: "8px" }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Mentores</Typography>
            <Typography variant="body2">
              Total:{Mentores.length}
            </Typography>
          </Box>
        </Item>

    </Box>
  );
}
