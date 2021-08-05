import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo-cellar-small.png"
import "./Navbar.css"
import { Button } from "../Button/Button";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

function Navbar() {
    const [click, setClick] = useState(false);
    // const [button, setButton] = useState(true);
    // const [navbar, setNavbar] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // const showButton = () => {
    //     if(window.innerWidth <= 600) {
    //         setButton(true);
    //     } else {
    //         setButton(false);
    //     }
    // };
    //
    // window.addEventListener('resize', showButton);
    //
    // useEffect(() => {
    //     showButton();
    // }, []);

    // const changeBackground = () => {
    //     if(window.location.pathname === "/") {
    //         setNavbar(true)
    //     } else {
    //         setNavbar(false);
    //     }
    // };
    //
    // window.addEventListener('onload', changeBackground);

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };


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
                            <Button
                                className="navbar-links-mobile navbar-links"
                                link={"/"}
                                type="logout"
                                onClick={logout}
                                stylebutton="btn--outline">
                                Logout
                            </Button>
                            {/*// <Link className="navbar-links-mobile  to="/" onClick={logout} stylebutton="btn--outline">*/}
                            {/*//     Logout*/}
                            {/*// </Link>*/}
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
                                stylebutton="btn--outline">
                                Login
                            </Button>
                        </li>
                    </ul>
                    {/*{button && <Button stylebutton="btn--outline">Login</Button> }*/}
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
                <nav>
                    {showNav()}
                </nav>

            </div>

        </nav>
    );
}

export default Navbar;