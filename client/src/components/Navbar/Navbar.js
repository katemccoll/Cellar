import React, {useEffect, useState} from "react";
import logo from "../assets/images/cellar-logo-small.png"
import "./Navbar.css"
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if(window.innerWidth <= 500) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener("resize", showButton);

    return(
        <nav className="navbar">
            <Link to="/"><img src={logo} alt="cellar-logo" className="navbar-logo" /></Link>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
                <ul className={click ? 'navbar-menu active' : 'navbar-menu'}>
                    <li className="navbar-item">
                        <Link className="navbar-links" to="/" onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-links" to="/add-wine" onClick={closeMobileMenu}>
                            Add Wine
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-links" to="/collection" onClick={closeMobileMenu}>
                            Collection
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-links" to="/search" onClick={closeMobileMenu}>
                            Search
                        </Link>
                    </li>
                    <li className="navbar-item">
                        <Link className="navbar-links-mobile" to="/sign-in" onClick={closeMobileMenu} buttonStyle="btn--outline">
                            Sign in
                        </Link>
                    </li>
                </ul>
            {button && <Button buttonStyle="btn--outline">Sign In</Button>}
        </nav>
    )
}

export default Navbar;