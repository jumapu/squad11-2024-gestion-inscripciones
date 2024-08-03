import NavHome from "./components/NavHome"
import "./css/home.css"
import logo from "../../assets/logo.webp"
const Home = () => {
    return (
        <div>
            <div className="containerHome">
                <div className="headHome">
                    <img src={logo} alt="logo" />
                    <section className="navHome">
                        <NavHome />
                    </section>
                    <div>
                        <button className="btnAcceso">Acceso</button>
                    </div>
                </div>
                <section className="bodyHome">
                    <p className="textHome">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi molestias quasi neque architecto. Obcaecati omnis deserunt sint consequatur, perspiciatis a veritatis aspernatur autem voluptates blanditiis accusamus repudiandae maxime natus neque.
                    </p>
                </section>
            </div>
        </div>
    )
}

export default Home