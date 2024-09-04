import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Egresadosdash from "./views/Egresadosdash/Egresadosdash";
import Mentordash from "./views/Mentordash/Mentordash";
import Dashboard from "./views/Admindash/Dashboard";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/admindash" element={<Dashboard />}></Route> 
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/egresadosdash" element={<Egresadosdash />}></Route>
          <Route path="/mentordash" element={<Mentordash />}></Route>
          
        </Route>
      </Routes>
    </>
  );
}

export default App;
