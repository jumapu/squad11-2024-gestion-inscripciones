import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Egresadosdash from "./views/Egresadosdash/Egresadosdash";
import Mentordash from "./views/Mentordash/Mentordash";
import Dashboard from "./views/Admindash/Dashboard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Egresados from "./views/Admindash/Egresados";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import Mentores from "./views/Admindash/Mentores";
import Eventos from "./views/Admindash/Eventos/Eventos";
import Agregar from "./views/Admindash/Eventos/Component/Agregar";
import TeamGroupFilter from "./views/Admindash/Team/TeamGroupFilter";
import GroupTable from "./views/Admindash/Team/GroupTable";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/egresadosdash" element={<Egresadosdash />}></Route>
          <Route path="/mentordash" element={<Mentordash />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/egresados" element={<Egresados />}></Route>
          <Route path="/mentores" element={<Mentores />}></Route>
          <Route path="/eventos" element={<Eventos />}></Route>
          <Route path="/eventos/agregar" element={<Agregar />}></Route>
          <Route path="/createTeam/:id" element={<TeamGroupFilter />}></Route>
          <Route path="/team/:id" element={<GroupTable />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
