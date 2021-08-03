import React from "react";
import {Button} from "../Button/Button";
import "./HeroSection.css"

function HeroSection() {


    return (
        <div className="hero-container">
            <video
                src="/videos/wine-video-hd.mp4"
                autoPlay loop muted></video>
            <div className="header-container">
                <h1>Cellar</h1>
                <p>Your Wine Bank</p>
            </div>

            <div className="hero-btns">
                <Button
                    type={"add-wine"}
                    link={"/add-wine"}
                    className="btn"
                    sizebutton="btn--large"
                    stylebutton="btn--outline"
                >
                    Add Wine
                </Button>
                <Button
                    type={"view-wine"}
                    link={"/view-wine"}
                    className="btn"
                    sizebutton="btn--large"
                    stylebutton="btn--outline"
                >
                    View Wines
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;
