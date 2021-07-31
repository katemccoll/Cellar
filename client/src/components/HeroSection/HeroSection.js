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
                <Button className="btn" buttonSize="btn--large" buttonStyle="btn--outline">Add Wine</Button>
                <Button className="btn" buttonSize="btn--large" buttonStyle="btn--outline">View Wines</Button>
            </div>
        </div>
    );
}

export default HeroSection;
