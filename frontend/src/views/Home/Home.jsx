import NavHome from "./components/NavHome";
import { slide as Menu } from 'react-burger-menu';
import { useState } from "react";
import "./css/home.css";
import logo from "@/assets/logo.webp";
import { Link } from "react-router-dom";
import { Button, Flex } from "@radix-ui/themes";

const Home = () => {
    const [active, setActive] = useState(false);
    return (
        <div>
            <Flex className="containerHome">
                <div className="menuHome">
                    <Menu width="40%" right isOpen={active} onStateChange={(state) => setActive(state.isOpen)} >
                        <NavHome isBurgerMenu={true} />
                    </Menu>
                </div>
                <div className="headHome">
                    <img src={logo} alt="logo" />
                    <section className="menuNav">
                        <NavHome isBurgerMenu={false} />
                    </section>
                    <div>
                        <Link to="login">
                            <Button  className="btnAcceso z-10">Acceso</Button>
                        </Link>
                    </div>
                </div>
                <section className="bodyHome">
                    <p className="textHome">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi molestias quasi neque architecto.
                        Obcaecati omnis deserunt sint consequatur, perspiciatis a veritatis aspernatur autem voluptates
                        blanditiis accusamus repudiandae maxime natus neque.
                    </p>
                </section>
            </Flex>
        </div>
    )
}

export default Home