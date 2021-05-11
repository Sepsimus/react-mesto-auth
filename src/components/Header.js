import header__logo from '../image/header__logo.svg';

function  Header(){
    return(
        <header className="header">
            <img className="header__logo" src={header__logo} alt="Место. Россия" />
        </header>
    )
}

export default Header;