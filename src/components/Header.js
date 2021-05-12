import { Link } from 'react-router-dom';
import header__logo from '../image/header__logo.svg';

function  Header(props){
    return(
        <header className="header">
            <img className="header__logo" src={header__logo} alt="Место. Россия" />
            <Link className="header__link" to={props.linkPath}>{props.linkName}</Link>
        </header>
    )
}

export default Header;