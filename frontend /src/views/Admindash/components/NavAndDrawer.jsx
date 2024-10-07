import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MdLeaderboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineGroup } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { PiGearFill } from "react-icons/pi";
import { IoMenu } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import Notifications from "@/components/Notifications";
import { IoIosNotificationsOutline } from "react-icons/io";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";

const drawerWidth = 240;

function NavAndDrawer() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { message: "Nuevo Taller de Git" },
    { message: "Próximo Curso: 2024-10-20" },
    { message: "Workshop: Reconversión" },
    { message: "Registración para Acelerador" },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const handleNotificaciones = () => {
    setShowNotifications(!showNotifications);
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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
    { icon: <MdLeaderboard />, text: "Dashboard", path: "/dashboard" },
    { icon: <GiGraduateCap />, text: "Egresados", path: "/egresados" },
    { icon: <MdOutlineGroup />, text: "Mentores", path: "/mentores" },
    { icon: <IoCalendar />, text: "Eventos", path: "/eventos" },
    { icon: <PiGearFill />, text: "Configuración", path: "/configuracion" },
    { icon: <IoPersonOutline />, text: "Perfil", path: "/perfil" },
    { icon: <IoLogOutOutline />, text: "Cerrar Sesión", path: "/login" },
  ];
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const drawer = (
    <div className="from-blue-300 to-red-300 bg-gradient-to-r h-screen">
      <Toolbar className="justify-center">
        <Logo />
      </Toolbar>
      <Divider />
      <List>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemButton
                onClick={
                  item.text === "Cerrar Sesión"
                    ? handleLogout
                    : () => {
                        navigate(item.path);
                      }
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText className="text-gray-700" primary={item.text} />
              </ListItemButton>
            </ListItem>
            {index < items.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
  return (
    <Box
      sx={{
        width: { sm: `calc(100vw - ${drawerWidth}px)`, md: "screen" },
        ml: { sm: `${drawerWidth}px` },
        maxWidth: "1440px",
      }}
    >
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
          sx={{ mr: 2, gap: "1rem", display: { sm: "none" } }}
        >
          <IoMenu />
        </IconButton>

        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            flexDirection: "column",
            textAlign: "right",
            justifyContent: "flex-end",
          }}
        ></Box>
        <Box display={"flex"} flexDirection={"row"} paddingX={"1rem"}>
          <Box>
            <div>
              <IconButton
                size="large"
                aria-label="show 4 new notifications"
                aria-haspopup="true"
                color="inherit"
                onClick={handlePopoverOpen}
              >
                <Badge badgeContent={4} color="error">
                  <IoIosNotificationsOutline onClick={handleNotificaciones} />
                </Badge>
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Box
                  fontSize={14}
                  padding={"1rem"}
                  border={"1px solid red"}
                  overflow={"hidden"}
                >
                  <Notifications
                    p={2}
                    notifications={notifications}
                    onClose={handlePopoverClose}
                  />
                </Box>
              </Popover>
            </div>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            paddingX={"2rem"}
          >
            <Typography>Fulano de Tal</Typography>
            <Typography fontSize={"0.85rem"} color="slategray">
              Administrador
            </Typography>
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
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default NavAndDrawer;
