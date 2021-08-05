import React from 'react';
import WineCard from "../WineCard/WineCard";

const WineList = ({ wines }) => {
    // if (!wines.length) {
    //     return <h3>
    //         Better start building your wine cellar!
    //         Don't want to be caught out buying a shit wine!
    //     </h3>;
    // }
    const renderedList = wines.map((wine) => {
        return <WineCard key={wine._id} wine={wine} />;
    });

    return (
        <div>
            <h2>Your Cellar:</h2>
            <div>{renderedList}</div>
        </div>
    );
}

export default WineList;