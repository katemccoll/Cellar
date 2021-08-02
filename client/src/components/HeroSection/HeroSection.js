import React from "react";
import {Button} from "../Button/Button";
import "./HeroSection.css"

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="/videos/pexels-kindel-media-8093236.mp4" autoPlay loop muted></video>
            <h1>Cellar</h1>
            <p>Your Wine Bank</p>
            <div className="hero-btns">
                <Button
                    type={"add-wine"}
                    link={"/add-wine"}
                    className="btn"
                    buttonSizes="btn--large"
                    buttonStyle="btn--outline"
                >
                    Add Wine
                </Button>
                <Button
                    type={"view-wine"}
                    link={"/view-wine"}
                    className="btn"
                    buttonSizes="btn--large"
                    buttonStyle="btn--outline"
                >
                    View Wines
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
