import React, { useState } from 'react';
import "./assets/css/Login.css";
import { Button } from "./Button/Button";
import { LOGIN } from "../utils/mutations";
import  Auth from "../utils/auth";
import {useMutation} from "@apollo/client";


const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });

    const [login, { error }] = useMutation(LOGIN);

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

        return (
            <div className="card-h">
                <h1>Welcome Back!</h1>
                <div className="input-group">
                    <form className="login-form" onSubmit={handleFormSubmit}>
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            onChange={handleChange}
                        />
                        {error ? (
                            <>
                                <p className="error-login-message">The provided credentials are incorrect</p>
                            </>
                        ) : null}
                        <Button
                            className="btn"
                            type="submit"
                            sizebutton="btn--large"
                            stylebutton="btn--outline">
                            Login
                        </Button>
                    </form>
                </div>

            </div>
        );
};

export default Login;

