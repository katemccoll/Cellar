import React from "react";
import {Button} from "../Button/Button";
import "./HeroSection.css"
import Auth from "../../utils/auth";

function HeroSection() {

    let getStartedLink = Auth.loggedIn() ? "/collection" : "/login";

    return (
        <div className="hero-container">
            <div className="header-container">
                <h2>Build your online wine cellar</h2>
                <p>Add wines you love and the ones to avoid!</p>
                <div>
                    <Button
                    link={getStartedLink}
                    className="btn"
                    sizebutton="btn--large"
                    stylebutton="btn--green"
                >
                    Get Started
                </Button>
                </div>

            </div>

        </div>
    );
}

export default HeroSection;
