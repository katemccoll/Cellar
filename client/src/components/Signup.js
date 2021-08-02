import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import "./assets/css/Signup.css";
import logo from "./assets/images/cellar-logo-small.png";
// import {Button} from "./Button/Button";

const Signup = (props) => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const mutationResponse = await addUser({
            variables: {
                firstName: formState.firstName,
                lastName: formState.lastName,
                email: formState.email,
                password: formState.password
            },
        });
        const token = mutationResponse.data.addUser.token;
        Auth.login(token);
    };

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

                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="lastName"
                        className="signup-input"
                        placeholder="Last Name"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        className="signup-input"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="signup-input"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <button className="btn" type="submit" >Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;