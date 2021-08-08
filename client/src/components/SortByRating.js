import React from "react";
import "./assets/css/SortByRating.css";

const SortByRating = () => {

    return (
        <div className="sort-by-rating-container">
            <label>Sort By Rating:</label>
            <select className="sort-by-rating">
                <option defaultValue="five-Star" data-content="">★★★★★</option>
                <option value="four-Star">★★★★</option>
                <option value="three-Star">★★★</option>
                <option value="two-Star">★★</option>
                <option value="one-star">★</option>
                <option value="unrated">Yet to be rated</option>
            </select>
        </div>

    )
};

export default SortByRating;
