import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PoloLogo from "../../assets/logo.webp";
import { MdLeaderboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineGroup } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { PiGearFill } from "react-icons/pi";
import { IoPersonOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <MdLeaderboard />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'egresados',
    title: 'Egresados',
    icon: <GiGraduateCap />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'mentores',
    title: 'Mentores',
    icon: <MdOutlineGroup />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'eventos',
    title: 'Eventos',
    icon: <IoCalendar />,
    children: [
        {
          segment: 'asignAutomatica',
          title: 'Asignacion Automatica',
          icon: <RiTeamFill />,
        },
      ],
  },
  {
    kind: 'divider',
  },
  {
    segment: 'configuracion',
    title: 'Configuracion',
    icon: <PiGearFill />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'perfil',
    title: 'Perfil',
    icon: <IoPersonOutline />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'cerrarSesiom',
    title: 'Cerrar Sesion',
    icon: <IoLogOutOutline />,
  },
  {
    kind: 'divider',
  },
];

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function AppProviderBasic() {

  const [pathname, setPathname] = useState('/page');

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);


  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      brandingbranding={{
        logo: <img src={PoloLogo} alt="polo_logo" />,
        title: 'Logo',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

AppProviderBasic.propTypes = {
  
  window: PropTypes.func,
};

export default AppProviderBasic;
