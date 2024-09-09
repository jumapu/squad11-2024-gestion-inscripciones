import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MdLeaderboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineGroup } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { PiGearFill } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import Avatar from '@mui/material/Avatar';
import DashboardCard from './DashboardCard';
import DashboardChart from './DashboardChart';
import DashboardCalendar from './DashboardCalendar';

const drawerWidth = 240;

function DashboardDrawer() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };
    const items = [
        { icon: <MdLeaderboard />, text: 'Dashboard' },
        { icon: <GiGraduateCap />, text: 'Egresados' },
        { icon: <MdOutlineGroup />, text: 'Mentores' },
        { icon: <IoCalendar />, text: 'Eventos' },
        { icon: <PiGearFill />, text: 'Configuración' },
        { icon: <IoPersonOutline />, text: 'Perfil' },
        { icon: <IoLogOutOutline />, text: 'Cerrar Sesion' }
    ];
    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                        {index < items.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </List>
        </div>
    );

    return (

        <Box sx={{
            width: { sm: `calc(100vw - ${drawerWidth}px)`, md:'screen' },
            ml: { sm: `${drawerWidth}px`},
        }}>
            <CssBaseline />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "2rem",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, gap:"1rem", display: { sm: 'none' } }}
                >
                    <IoMenu />
                </IconButton>
                <Typography variant="h6" noWrap component="div"
                    sx={{
                        padding: "1.5rem",
                        gap: "2rem",
                    }}
                >
                    Dashboard
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "1.5rem",
                        gap: "1rem"
                    }}
                >
                    <Box 
                    sx={ {  
                         display: { xs: 'none', sm: 'block' } ,
                        flexDirection: "column",
                        textAlign: "right",                       
                    }}
                    >
                        <Typography>Fulano de Tal</Typography>
                        <Typography component="div" 
                        sx={{
                            fontSize: "0.85rem",
                            color: "slategrey",
                            opacity: .5,
                            fontWeight: "500",
                        }}
                        >Administrador</Typography>
                    </Box>
                    <Avatar alt="" src="/static/images/avatar/1.jpg" />
                </Box>
            </Box>
            <Box>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />                
                <DashboardCard/>
                <DashboardChart/>
                <DashboardCalendar/>
            </Box>
        </Box>
    );
}

export default DashboardDrawer;