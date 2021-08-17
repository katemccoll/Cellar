import React, {useState} from "react";
import {Button} from "../Button/Button";
import "./Search.css";


const Search = ({handleSearch}) => {
    const [search, setSearch] = useState('');

    const updateSearch = (event) => {
        setSearch(event.target.value.substr(0, 20));

    }

    const onSubmit = (e) => {
        e.preventDefault();
        handleSearch(search);
    }

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={onSubmit}>
                <input
                    value={search}
                    type="text"
                    className="search"
                    placeholder="Search for your wine"
                    name="search"
                    onChange={updateSearch}
                />
                <Button
                    type="submit"
                    className="btn searchButton"
                    stylebutton="btn--icon-red"
                    sizebutton="btn--small"
                >
                    <i className="fas fa-search"> </i>
                </Button>

            </form>
        </div>
    )
}

export default Search;
