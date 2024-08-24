import "../css/navHome.css";
import { SegmentedControl } from "@radix-ui/themes";

const NavHome = (isBurgerMenu) => {


    return (

        <div>

            {isBurgerMenu ? (
                <div className="burger-menu-items">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Cursos
                    </a>

                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Webinars
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        Contacto
                    </a>
                </li>
            </ul>
            </div>
      ) : (
        <SegmentedControl.Root defaultValue="cursos" className="rounded-md shadow-lg shadow-slate-900">
          <SegmentedControl.Item value="cursos"><a href="#cursos">Cursos</a></SegmentedControl.Item>
          <SegmentedControl.Item value="webinars"> <a href="#webinars">Webinars</a></SegmentedControl.Item>
          <SegmentedControl.Item value="contacto"><a href="#contacto">Contacto</a></SegmentedControl.Item>
        </SegmentedControl.Root>
    )
}
      </div >
    );
}

export default NavHome