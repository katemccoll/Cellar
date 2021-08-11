import React, { useState } from "react";

import "./Navbar.css"
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const closeMobileMenu = () => setClick(false);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    function showNav() {
        if (Auth.loggedIn()) {
            return (
                <div className="flex">
                    <ul className={click ? 'navbar-menu active' : 'navbar-menu'}>
                        <li className="navbar-item home">
                            <Link className="navbar-links" to="/" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="navbar-item add-wine">
                            <Link className="navbar-links" to="/add-wine" onClick={closeMobileMenu}>
                                Add Wine
                            </Link>
                        </li>
                        <li className="navbar-item collection">
                            <Link className="navbar-links" to="/collection" onClick={closeMobileMenu}>
                                Collection
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Button
                                className="navbar-links-mobile navbar-links"
                                type="logout"
                                onClick={logout}
                                stylebutton="btn--green">
                                Logout
                            </Button>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    <ul className={click ? 'navbar-menu active' : 'navbar-menu'}>
                        <li className="navbar-item">
                            <Button
                                className="navbar-links-mobile"
                                link={"/login"}
                                type="login"
                                onClick={closeMobileMenu}
                                stylebutton="btn--green">
                                Login
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
                <div>
                    <Link to="/">
                        <h2 className="logo-title">Cellar</h2>
                    </Link>
                </div>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <nav>
                    {showNav()}
                </nav>
            </div>
        </nav>
    );
}

export default Navbar;