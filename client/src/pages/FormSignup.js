import React, { Component } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "./assets/css/FormSignup.css";
import Betty from "../assets/images/Betty-kate.png";

class FormSignup extends Component {
    state = {
            isLoginOpen: true,
            isSignupOpen: false,
    }

    showSignup() {
        this.setState({ isSignupOpen: true, isLoginOpen: false });
    }

    showLogin() {
        this.setState({ isSignupOpen: false, isLoginOpen: true });
    }

    render() {
        return (
            <main>
                <div className="block"></div>
                <section className="background-colour">
                    <div className="box-shadow">
                        <div className="betty-container">
                            <img src={Betty} alt={"Friends drinking wine"}/>
                        </div>
                        <div>
                            <div className="controller-container">
                                <div className={"controller-" + (this.state.isLoginOpen ? "selected-controller" : "")}
                                     onClick={this
                                         .showLogin
                                         .bind(this)}>
                                    Login
                                </div>
                                <div className={"controller-" + (this.state.isSignupOpen ? "selected-controller" : "")}
                                     onClick={this
                                         .showSignup
                                         .bind(this)}>
                                    Sign Up
                                </div>
                            </div>
                            <div>
                                { this.state.isLoginOpen && <Login/> }
                                { this.state.isSignupOpen && <Signup/> }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

export default FormSignup;
