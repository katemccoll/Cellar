import React from "react";
import {Button} from "./Button/Button";
import "./assets/css/Search.css";

const Search = () => {

    return (
        <div className="search-container">
            <form className="search-form">
                <input
                type="text"
                className="search"
                placeholder="Search for your wine"
                name="search"
                />
                <Button
                type="submit"
                className="btn searchButton"
                stylebutton="btn--icon-red"
                sizebutton="btn--small"
                >
                    <i className="fas fa-search"></i>
                </Button>
            </form>
        </div>
    )
}

export default Search;
