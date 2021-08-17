import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "./assets/css/FormSignup.css";
import Betty from "../assets/images/Betty-kate.png";

const FormSignup = () => {
    const [isLoginOpen, setShowLogin] = useState(true);


    const showSignup = () => {
        setShowLogin(false);
    }

    const showLogin = () => {
        setShowLogin(true);
    }
        return (
            <main>
                <div className="block" />
                <section className="background-colour">
                    <div className="box-shadow">
                        <div className="betty-container">
                            <img src={Betty} alt={"Friends drinking wine"}/>
                        </div>
                        <div>
                            <div className="controller-container">
                                <div className={"controller-" + (isLoginOpen ? "selected-controller" : "")}
                                     onClick={showLogin}>
                                    Login
                                </div>
                                <div className={"controller-" + (!isLoginOpen ? "selected-controller" : "")}
                                     onClick={showSignup}>
                                    Sign Up
                                </div>
                            </div>
                            <div>
                                { isLoginOpen && <Login/> }
                                { !isLoginOpen && <Signup/> }
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
}

export default FormSignup;
