// import { Outlet} from 'react-router-dom';
import NavAndDrawer from './components/NavAndDrawer';
import DashboardCard from './components/DashboardCard';
import DashboardChart from './components/DashboardChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Dashboard = () => {
  const drawerWidth = 240;
  return (
    <div >
      <NavAndDrawer />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Box sx={{
          width: { sm: `calc(100vw - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          maxWidth: "1440px",
        }}>
          <Typography variant="h6" noWrap component="div"
            sx={{
              padding: "1.5rem",
              gap: "2rem",
            }}
          >
            Dashboard
          </Typography>
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

