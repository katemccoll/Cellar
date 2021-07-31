import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header>
            <div>
                <Link to="/">
                    <h1>Cellar</h1>
                </Link>
                <p>Your Wine Bank</p>
            </div>
        </header>
    );
};

export default Header;