import { Card, Container, Button, Link } from "@radix-ui/themes";
import TablaEventos from "./components/TablaEventos";
//import ModalCrear from "./components/ModalCrear";
import logo from "@/assets/logo.webp";
import "./css/Admindash.css"
const Admindash = () => {
  return (
    <div>
      <Container className="container-eventos">
        <div>
          <img
            src={logo}
            className="logo"
            alt="logo"
          />
        </div>
        <span>
          <h1>Eventos</h1>
          <div className="btns">
            <Link to="modalcrear">
            <Button className="btn1" >Crear Evento</Button>
            </Link>
            <Button className="btn2">
              Modificar Evento
            </Button>
            <Button className="btn3">
              Borrar Evento
            </Button>
          </div>
        </span>
        <Card>
          <TablaEventos />
        </Card>
      </Container>
    </div>
  )
}

export default Admindash