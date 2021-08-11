import React from "react";
import "./SortBy.css";

const SortBy = ({ handleChange }) => {

    return (
        <div className="sort-by-container">
            <label>Sort By:</label>
            <select className="sort-by" name="sortBy" onChange={handleChange}>
                <option defaultValue="createdAt">Date Added</option>
                <option value="wineryName">Winery Name</option>
                <option value="year">Year</option>
                <option value="region">Region</option>
                <option value="wineType">Wine Type</option>
            </select>
        </div>
    )
};

export default SortBy;
