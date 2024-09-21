import { Route, Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Egresadosdash from "./views/Egresadosdash/Egresadosdash";
import Mentordash from "./views/Mentordash/Mentordash";
import Dashboard from "./views/Admindash/Dashboard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import Egresados from "./views/Admindash/Egresados";
import AdminLogin from "./views/AdminLogin/AdminLogin";
import Mentores from "./views/Admindash/Mentores";
import Eventos from "./views/Admindash/Eventos";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/registro" element={<Register />} />

        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/egresadosdash" element={<Egresadosdash />}></Route>
          <Route path="/mentordash" element={<Mentordash />}></Route>
          <Route path="/Dashboard" element={<Dashboard />}></Route>
          <Route path="/Egresados" element={<Egresados />}></Route>
          <Route path="/Mentores" element={<Mentores />}></Route>
          <Route path="/Eventos" element={<Eventos />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
