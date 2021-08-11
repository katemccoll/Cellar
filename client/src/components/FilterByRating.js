import React from "react";
import "./assets/css/FilterByRating.css";

const FilterByRating = ({ handleChange }) => {
    return (
        <div className="filter-by-rating-container">
            <label>Filter By Rating:</label>
            <select className="filter-by-rating" name="rating" onChange={handleChange}>
                <option defaultValue="all-ratings" data-content="">All Ratings</option>
                <option name="rating" value="1">★★★★★</option>
                <option name="rating" value="0.8">★★★★</option>
                <option name="rating" value="0.6">★★★</option>
                <option name="rating" value="0.4">★★</option>
                <option name="rating" value="0.2">★</option>
                <option name="rating" value="unrated">Yet to be rated</option>
            </select>
        </div>

    )
};

export default FilterByRating;
