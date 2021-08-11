import React from "react";
import "./assets/css/Collection.css"
import WineList from "../components/WineList/WineList";


const Collection = ({ client }) => {
    return (
        <div>
            <div className="image-bottles">
                <div className="padding-top">
                    <h1>Welcome to your cellar door!</h1>
                </div>

            </div>

            <WineList
                client={client}
                className="wineList"
            />
        </div>
    );
};

export default Collection;
