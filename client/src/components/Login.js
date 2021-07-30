import React, { useState } from 'react';

import "./assets/css/Login.css";
import logo from "./assets/images/cellar-logo.png";
import { Button } from "./Button/Button";

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormState({
            email: '',
            password: '',
        });
    }

        return (
            <div className="card-h">
                <div className="t-a-center"><img src={logo} alt="cellar-logo" className="logo" /></div>
                <div className="input-group">
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            value={formState.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <Button className="btn" type="submit" buttonSize="btn--large" buttonStyle="btn--outline">Login</Button>
                    </form>
                </div>

            </div>
        );
};

export default Login;

