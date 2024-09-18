import Eventos from "./EventosCard";
import Mentores from "./MentoresCard";
import Stack from "@mui/material/Stack";
import Egresados from "./EgresadosCard";
const DashboardCard = () => {
  return (
    <div>
      <Stack spacing={1} flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'}>
      <Eventos/>
      <Mentores/>
      <Egresados/>
      </Stack>
    </div>
  )
}

export default DashboardCard