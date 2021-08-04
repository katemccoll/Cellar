import React from 'react';
import WineCard from "../WineCard/WineCard";


const WineList = ({ wines }) => {

    return (
        <div>
            <h2>Your Cellar:</h2>
            {wines.length ? (
            wines && wines.map((wine) => (
                <WineCard
                    key={wine._id}
                    _id={wine._id}
                    wineryName={wine.wineryName}
                />
                ))
            ) : (
                <div>
                    <h3>Better start building your wine cellar!</h3>
                    <h2>Don't want to be caught out buying a shit wine!</h2>
                </div>
            )}
        </div>
    );
}



export default WineList;