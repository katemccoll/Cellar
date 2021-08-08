import React from "react";

const SortByRating = () => {

    return (
        <div>
            <label>Sort By Rating:</label>
            <select className="sort-by-rating">
                <option defaultValue="five-Star" data-content="">★★★★★</option>
                <option value="four-Star">★★★★</option>
                <option value="three-Star">★★★</option>
                <option value="two-Star">★★</option>
                <option value="one-star">★</option>
            </select>
        </div>

    )
};

export default SortByRating;