import React, {useState} from 'react';
import WineCard from "../WineCard/WineCard";
import "./WineList.css"
import Search from "../Search/Search";
import FilterByRating from "../FilterByRating/FilterByRating";
import FilterByWine from "../FilterByWine/FilterByWine";
import SortBy from "../SortBy/SortBy";

import {QUERY_WINES} from "../../utils/queries";


const WineList = (props) => {

    const [wines, setWines] = useState(props.wines);
    const {client} = props;

    let filters = {};

    function renderedList() {
        return (
            <>
                {
                    wines.map((wine) => {
                        if (!wines.length) {
                            return <h3>
                                Better start building your wine cellar!
                                Don't want to be caught out buying a shit wine!
                            </h3>;
                        }
                        return <WineCard key={wine._id} wine={wine}/>;
                    })
                }
            </>
        );
    }

    const loadWines = () => {
        client.query({
            query: QUERY_WINES, fetchPolicy: 'no-cache',
            variables: {filters: filters}
        }).then((res) => {

            setWines(res.data.wines);
        });
    }

    const handleChange = (e) => {
        let newValue = e.target.value;
        let name = e.target.name;

        if (name === "rating") {
            if (newValue === "all") {
                newValue = undefined;
            } else {
                newValue = Number(newValue);
            }
        }

        filters[name] = newValue;

        loadWines();
    };

    const handleSearch = (searchString) => {
        filters.searchWineryName = searchString;
        loadWines();
    };

    return (
        <div className="text-align-center">
            <div className="filter-container">
                <Search handleSearch={handleSearch}/>
                <SortBy handleChange={handleChange}/>
                <FilterByRating handleChange={handleChange}/>
                <FilterByWine handleChange={handleChange}/>
            </div>
            <div>{renderedList()}</div>
        </div>
    );
}

export default WineList;
