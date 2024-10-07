import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Dashboard from "./views/Admindash/Dashboard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Egresados from "./views/Admindash/Egresados";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import Mentores from "./views/Admindash/Mentores";
import Eventos from "./views/Admindash/Eventos/Eventos";
import Agregar from "./views/Admindash/Eventos/Component/Agregar";
import TeamGroupFilter from "./views/Admindash/Team/TeamGroupFilter";
import GroupTable from "./views/Admindash/Team/GroupTable";
import ListEvents from "./views/User/ListEvents";
import Events from "./views/User/Events";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminlogin" element={<AdminLogin />} />

      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/egresados" element={<Egresados />} />
        <Route path="/mentores" element={<Mentores />} />

        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/agregar" element={<Agregar />} />

        <Route path="/createTeam/:id" element={<TeamGroupFilter />} />
        <Route path="/team/:id" element={<GroupTable />} />

        <Route path="/user/eventos" element={<ListEvents />} />
        <Route path="/user/mis_eventos" element={<Events />} />
      </Route>
    </Routes>
  );
}

export default App;
