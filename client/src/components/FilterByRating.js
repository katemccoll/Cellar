import React from "react";
import "./assets/css/FilterByRating.css";

const FilterByRating = () => {

    return (
        <div className="filter-by-rating-container">
            <label>Filter By Rating:</label>
            <select className="filter-by-rating">
                <option defaultValue="all-ratings" data-content="">All Ratings</option>
                <option value="five-Star">★★★★★</option>
                <option value="four-Star">★★★★</option>
                <option value="three-Star">★★★</option>
                <option value="two-Star">★★</option>
                <option value="one-star">★</option>
                <option value="unrated">Yet to be rated</option>
            </select>
        </div>

    )
};

export default FilterByRating;
