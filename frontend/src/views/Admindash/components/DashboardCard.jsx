import Eventos from "./Eventos";
import Mentores from "./Mentores";
import Stack from "@mui/material/Stack";
import Egresados from "./Egresados";
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