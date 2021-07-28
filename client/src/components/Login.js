import React, { useState } from 'react';

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
            <div>
                <div className="input-group">
                    <form onSubmit={handleFormSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="Email"
                            value={formState.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="login-input"
                            placeholder="Password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="login-btn"
                            style={{ cursor: 'pointer '}}
                        >Login</button>
                    </form>
                </div>

            </div>
        );
};

export default Login;

