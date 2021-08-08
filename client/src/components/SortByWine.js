import React from "react";
import "./assets/css/SortByWine.css"

const SortByWine = () => {

    return (
        <div className="sort-by-wine-container">
            <label>Sort By Wine:</label>
            <select className="sort-by-wine">
                <option defaultValue="red-wine">Red Wine</option>
                <option value="white-wine">White Wine</option>
                <option value="rose-wine">Rosé Wine</option>
                <option value="sparkling-wine">Sparkling Wine</option>
                <option value="dessert-wine">Dessert Wine</option>
                <option value="fortified-wine">Fortified Wine</option>
            </select>
        </div>

    )
};

export default SortByWine;
