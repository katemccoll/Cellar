import React from 'react';
import "../App.css";
import HeroSection from "../components/HeroSection/HeroSection";
import "./assets/css/Home.css";

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
                        Are you also taking way too much time looking at wine trying to remember which one you tried and liked?
                        Or which one your partner hated? Or even scrolling through your photos to find that wine you tried at
                        that restaurant that one  We have all been there!
                    </p>
                </div>
                <div>
                    <div>
                        <h4>Have a wine you love?</h4>
                    </div>
                    <div>
                        <h4>Add the wine</h4>
                    </div>
                    <div>
                        <h4>Time Saver!</h4>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Home;