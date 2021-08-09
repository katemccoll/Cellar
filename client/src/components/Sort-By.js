import React from "react";
import "./assets/css/SortBy.css";

const SortBy = () => {

    return (
        <div className="sort-by-container">
            <label>Sort By:</label>
            <select className="sort-by">
                <option defaultValue="date-added">Date Added</option>
                <option value="winery-name">Winery Name</option>
                <option value="year">Year</option>
                <option value="region">Region</option>
                <option value="wine-type">Wine Type</option>
            </select>
        </div>

    )
};

export default SortBy;
