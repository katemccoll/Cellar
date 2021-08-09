import React from "react";
import "./assets/css/FilterByWine.css"

const FilterByWine = () => {

    return (
        <div className="filter-by-wine-container">
            <label>Filter By Wine:</label>
            <select className="filter-by-wine">
                <option defaultValue="all-wines">All Wines</option>
                <option value="red-wine">Red Wine</option>
                <option value="white-wine">White Wine</option>
                <option value="Rosé Wine">Rosé Wine</option>
                <option value="sparkling-wine">Sparkling Wine</option>
                <option value="dessert-wine">Dessert Wine</option>
                <option value="fortified-wine">Fortified Wine</option>
            </select>
        </div>

    )
};

export default FilterByWine;
