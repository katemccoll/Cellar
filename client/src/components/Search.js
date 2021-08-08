import React from "react";
import {Button} from "./Button/Button";

const Search = () => {

    return (
        <div>
            <form>
                <input
                type="text"
                id="search"
                placeholder="Search for your wine"
                name="search"
                />
                <Button
                type="submit"
                >
                    Search
                </Button>
            </form>
        </div>
    )
}

export default Search;