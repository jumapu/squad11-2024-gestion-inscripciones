// import { Outlet} from 'react-router-dom';
import DashboardDrawer from './components/DashboardDrawer';
import DashboardCard from './components/DashboardCard';
import DashboardChart from './components/DashboardChart';

import Box from '@mui/material/Box';


const Dashboard = () => {
  const drawerWidth = 240;
  return (
    <div >
      <DashboardDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Box sx={{
          width: { sm: `calc(100vw - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          maxWidth: "1440px",
        }}>

          <DashboardCard />
          <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} maxWidth={"90%"}>
            <DashboardChart />            
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;

