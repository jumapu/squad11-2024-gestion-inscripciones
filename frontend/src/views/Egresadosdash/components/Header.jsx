import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <Link to="/">Eventos</Link>
                <Link to="/profile">Perfil</Link>
                <Link to="/logout">Cerrar sesión</Link>
            </nav>
        </header>
    );
};

export default Header;
