import React from "react";
import {Button} from "../Button/Button";
import "./HeroSection.css"
import Auth from "../../utils/auth";
import {useQuery} from "@apollo/client";
import { useParams } from 'react-router-dom';
import {QUERY_USER} from "../../utils/queries";



function HeroSection() {
    const { firstName: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { firstName: userParam },
    });
    const user = data?.user || {};

    let getStartedLink = Auth.loggedIn() ? "/collection" : "/login";
    let headerTitle = Auth.loggedIn() ? `Hi ${(user.firstName)}!` : "Build your online wine cellar";

    if (loading) {
        return <div>Loading....</div>
    }
    return (
        <div className="hero-container">
            <div className="header-container">
                <h2>{headerTitle}</h2>
                <p>Add the wines you love and the ones to avoid!</p>
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
