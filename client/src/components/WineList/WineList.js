import React from 'react';
import WineCard from "../WineCard/WineCard";
import "./WineList.css"
import Search from "../Search";
import FilterByRating from "../FilterByRating";
import FilterByWine from "../FilterByWine";
import SortBy from "../Sort-By";

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
                <SortBy />
                <FilterByRating />
                <FilterByWine />
            </div>
            <div>{renderedList}</div>
        </div>
    );
}

export default WineList;
