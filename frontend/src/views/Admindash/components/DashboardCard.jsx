import Eventos from "./Eventos";
import Mentores from "./Mentores";
import Stack from "@mui/material/Stack";
const DashboardCard = () => {
  return (
    <div>
      <Stack spacing={2}>
      <Eventos/>
      <Mentores/>
      </Stack>
    </div>
  )
}

export default DashboardCard