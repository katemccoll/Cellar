import React, { useState, useEffect } from "react";
import logo from "../assets/images/cellar-logo-small.png"
import "./Navbar.css"
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    // const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton);

    useEffect(() => {
        showButton();
    }, []);

    // const changeBackground = () => {
    //     if(window.location.pathname === "/") {
    //         setNavbar(true)
    //     } else {
    //         setNavbar(false);
    //     }
    // };
    //
    // window.addEventListener('onload', changeBackground);



    function showNav() {
        if (Auth.loggedIn()) {
            return (
                <div className="flex">
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
                            <Link className="navbar-links" to="/view-wine" onClick={closeMobileMenu}>
                                Collection
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-links" to="/search" onClick={closeMobileMenu}>
                                Search
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-links-mobile navbar-links" to="/" onClick={() => Auth.logout()} stylebutton="btn--outline">
                                Logout
                            </Link>
                        </li>
                    </ul>
                    {button && <Button stylebutton="btn--outline">Logout</Button>}
                </div>
            );
        } else {
            return (
                <div>
                    <ul className={click ? 'navbar-menu active' : 'navbar-menu'}>
                        <li className="navbar-item sign">
                            <Button
                                className="navbar-links-mobile"
                                link={"/sign-up"}
                                onClick={closeMobileMenu}
                                stylebutton="btn--outline">
                                Sign Up
                            </Button>
                        </li>
                    </ul>
                </div>
            )
        }
    }

    return(
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/"><img src={logo} alt="cellar-logo" className="navbar-logo" /></Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                {showNav()}
            </div>

        </nav>
    );
}

export default Navbar;