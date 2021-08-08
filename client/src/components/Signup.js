import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import "./assets/css/Signup.css";
import validator from "validator";
import {Button} from "./Button/Button";


const Signup = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [addUser] = useMutation(ADD_USER);
    const [errors, setErrors] = useState({});

    const ValidateInfo = (values) => {
        let errors = {};

        if (!values.firstName) {
            errors.firstName = "First name is required";
        }

        if (!values.lastName) {
            errors.lastName = "Last name is required";
        }

        if (!values.email) {
            errors.email = "Email is required";
        } else if (!validator.isEmail(values.email)) {
            errors.email = "Email is invalid";
        }

        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 8) {
            errors.password = "Password needs to be 8 characters or longer";
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = "Password is required";
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords need to match";
        }
        return errors;
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let inputErrors = ValidateInfo(formState);
        setErrors(inputErrors);

        if (Object.keys(inputErrors).length > 0) {
            return;
        }

        try {
            const {data} = await addUser({
                variables: {...formState},
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="card-h">
            <div className="input-group">
                <form className="signup" onSubmit={handleFormSubmit}>

                    <input
                        type="text"
                        name="firstName"
                        className="signup-input"
                        placeholder="First Name"
                        value={formState.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <p className="error-signup-message">{errors.firstName}</p>}
                    <input
                        type="text"
                        name="lastName"
                        className="signup-input"
                        placeholder="Last Name"
                        value={formState.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <p className="error-signup-message">{errors.lastName}</p>}
                    <input
                        type="email"
                        name="email"
                        className="signup-input"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error-signup-message">{errors.email}</p>}
                    <input
                        type="password"
                        name="password"
                        className="signup-input"
                        placeholder="Password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error-signup-message">{errors.password}</p>}
                    <input
                        type="password"
                        name="confirmPassword"
                        className="signup-input"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error-signup-message">{errors.confirmPassword}</p>}
                    <Button
                        type={"submit"}
                        className="btn"
                        sizebutton="btn--large"
                        stylebutton="btn--outline"
                    >
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;