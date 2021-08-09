import React from "react";
import "./assets/css/FilterByWine.css"

const FilterByWine = () => {

    return (
        <div className="filter-by-wine-container">
            <label>Filter By Wine:</label>
            <select className="filter-by-wine">
                <option defaultValue="all-wines">All Wines</option>
                <option value="Red Wine">Red Wine</option>
                <option value="White Wine">White Wine</option>
                <option value="Rosé Wine">Rosé Wine</option>
                <option value="Sparkling Wine">Sparkling Wine</option>
                <option value="Dessert Wine">Dessert Wine</option>
                <option value="Fortified Wine">Fortified Wine</option>
            </select>
        </div>

    )
};

export default FilterByWine;
