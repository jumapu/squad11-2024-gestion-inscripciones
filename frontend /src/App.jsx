import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Dashboard from "./views/Admindash/Dashboard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Egresados from "./views/Admindash/Egresados";
import Mentores from "./views/Admindash/Mentores";
import Eventos from "./views/Admindash/Eventos/Eventos";
import Agregar from "./views/Admindash/Eventos/Component/Agregar";
import TeamGroupFilter from "./views/Admindash/Team/TeamGroupFilter";
import GroupTable from "./views/Admindash/Team/GroupTable";
import ListEvents from "./views/User/ListEvents";
import Events from "./views/User/Events";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Register />} />

      <Route element={<AuthOutlet fallbackPath="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/egresados" element={<Egresados />} />
        <Route path="/mentores" element={<Mentores />} />

        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/agregar" element={<Agregar />} />

        <Route path="/createTeam/:id" element={<TeamGroupFilter />} />
        <Route path="/team/:id" element={<GroupTable />} />

        <Route path="/:id/eventos" element={<ListEvents />} />
        <Route path="/:id/mis_eventos" element={<Events />} />
      </Route>
    </Routes>
  );
}

export default App;
