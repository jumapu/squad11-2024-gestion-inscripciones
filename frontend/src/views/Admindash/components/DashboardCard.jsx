import Eventos from "./EventosCard";
import Mentores from "./MentoresCard";
import Stack from "@mui/material/Stack";
import Egresados from "./EgresadosCard";
const DashboardCard = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> 
      <Stack  flexDirection={'row'}  flexWrap={'wrap'} gap={1}>
      <Eventos/>
      <Mentores/>
      <Egresados/>
      </Stack>
    </div>
  )
}

export default DashboardCard