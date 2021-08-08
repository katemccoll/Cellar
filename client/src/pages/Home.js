import React from 'react';
import "../App.css";
import HeroSection from "../components/HeroSection/HeroSection";
import "./assets/css/Home.css";
import GrapeIcon from "../assets/images/grape-icon-kate.png";
import WineGlassIcon from "../assets/images/wine-glass-kate.png";
import BottleIcon from "../assets/images/bottle-icon-kate.png";

const Home = () => {

    return (
        <div>
            <HeroSection />
            <div className="cellar-info">
                <div className="about-container">
                    <h2>
                        Never forget a wine again!
                    </h2>
                    <p>
                        Are you also taking way too long looking at wine trying to remember which one you tried and liked?
                        Or which one your mother hated so you don't take that one to Sunday night dinner? Or even scrolling through your photos to find that wine you tried at
                        that restaurant that one  We have all been there!
                    </p>
                </div>
                <div className="about-icons">
                    <div>
                        <img src={GrapeIcon} alt={"grapes"}/>
                        <h4>Have a wine you love?</h4>
                        <p>Tried a wine at a restaurant that you loved?</p>
                    </div>
                    <div className="wine-icon">
                        <img src={WineGlassIcon} alt={"wine-glass"}/>
                        <h4>Add the wine</h4>
                        <p>Open up Cellar and easily add information about the wine</p>
                    </div>
                    <div>
                        <img src={BottleIcon} alt={"bottle"}/>
                        <h4>Time Saver!</h4>
                        <p>Quickly find the wine you want to try the nect time you are at the supermarket or liquor store.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;