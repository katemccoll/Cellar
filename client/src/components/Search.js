import React from "react";
import {Button} from "./Button/Button";
import "./assets/css/Search.css";

const Search = () => {

    return (
        <div className="search-container">
            <form>
                <input
                type="text"
                id="search"
                placeholder="Search for your wine"
                name="search"
                />
                <Button
                type="submit"
                className="btn"
                sizebutton="btn--medium"
                stylebutton="btn--outline"
                >
                    <i className="fas fa-search"></i>
                </Button>
            </form>
        </div>
    )
}

export default Search;
