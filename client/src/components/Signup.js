import React, { useState } from 'react';


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
        <div>
            <div className="input-group">
                <form onSubmit={handleFormSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        className="signup-input"
                        placeholder="First Name"
                        value={formState.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        className="signup-input"
                        placeholder="Last Name"
                        value={formState.lastName}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="register-input"
                        placeholder="Email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
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
                        className="signup-input"
                        style={{ cursor: 'pointer '}}
                    >signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;