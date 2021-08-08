import React from "react";
import {Button} from "../Button/Button";
import "./HeroSection.css"

function HeroSection() {


    return (
        <div className="hero-container">
            <div className="header-container">
                <h2>Build your online wine cellar</h2>
                <p>Add wines you love and the ones to avoid!</p>
                <div>
                    <Button
                    type={"add-wine"}
                    link={"/add-wine"}
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
