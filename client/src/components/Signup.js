import React, { useState } from 'react';

import "./assets/css/Signup.css";
import logo from "./assets/images/cellar-logo-small.png";

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="card-h">
            <div className="t-a-center"><img src={logo} alt="cellar-logo" className="logo" /></div>
            <div className="input-group">
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        name="firstName"
                        className="signup-input"
                        placeholder="First Name"
                        value={formState.firstName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        className="signup-input"
                        placeholder="Last Name"
                        value={formState.lastName}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        className="signup-input"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="signup-input"
                        placeholder="Password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="signup-btn"
                        style={{ cursor: 'pointer '}}
                    >Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;