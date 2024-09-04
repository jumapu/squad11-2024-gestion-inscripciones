import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { MdLeaderboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineGroup } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { PiGearFill } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function DashboardNav() {

    const menuId = 'drawer-logo-account-menu';
    const renderMenu = (
        <Menu
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
        </Menu>
    );

    const [open, setOpen] = useState(false);

    const toggleDrawer = (Open) => (event) => {
        //Si es un clic en el fondo o si presiona Esc
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(Open);
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

    const DrawerList =
        <Box sx={{ width: 250 }} role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
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
            <Divider />
        </Box>
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color='transparent' position="static">
                <Toolbar color='transparent' >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}>
                        <IoMenu />
                    </IconButton>
                    <Drawer open={open} onClose={toggleDrawer(false)}>
                        {DrawerList}
                    </Drawer>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <IoIosNotifications />
                            </Badge>
                        </IconButton>
                        
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            color="inherit"
                        >
                            <Typography variant="h6" 
                            Wrap 
                            component="div" 
                            className='p-2'
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            >
                                Fulano de Tal
                        </Typography>
                            <MdAccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
