import React from 'react';
import WineCard from "../WineCard/WineCard";
import "./WineList.css"
import Search from "../Search";
import SortByRating from "../SortByRating";
import SortByWine from "../SortByWine";

const WineList = ({ wines }) => {
    const renderedList = wines.map((wine) => {
        if (!wines.length) {
            return <h3>
                Better start building your wine cellar!
                Don't want to be caught out buying a shit wine!
            </h3>;
        }
        return <WineCard key={wine._id} wine={wine}/>;
    });

    return (
        <div className="text-align-center">
            <div className="filter-container">
                <Search />
                <SortByRating />
                <SortByWine />
            </div>
            <div>{renderedList}</div>
        </div>
    );
}

export default WineList;
