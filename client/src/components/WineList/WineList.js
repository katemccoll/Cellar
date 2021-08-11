import React, { Component } from 'react';
import WineCard from "../WineCard/WineCard";
import "./WineList.css"
import Search from "../Search/Search";
import FilterByRating from "../FilterByRating/FilterByRating";
import FilterByWine from "../FilterByWine/FilterByWine";
import SortBy from "../SortBy/SortBy";

import { QUERY_WINES } from "../../utils/queries";


export default class WineList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wines: props.wines,
        }

        this.client = props.client;
        this.filters = {};
    }

    renderedList() {
        return (
            <>
                {
                    this.state.wines.map((wine) => {
                        if (!this.state.wines.length) {
                            return <h3>
                                Better start building your wine cellar!
                                Don't want to be caught out buying a shit wine!
                            </h3>;
                        }
                        return <WineCard key={wine._id} wine={wine}/>;
                    })
                }
            </>
        )
    }

    loadWines() {
        this.client.query({query: QUERY_WINES, fetchPolicy: 'no-cache',
            variables: { filters: this.filters}
        }).then((res) => {

            this.setState(prevState => ({
                ...prevState,
                wines: res.data.wines,
            }));
        });
    }

    handleChange = (e) => {
        let newValue = e.target.value;
        let name = e.target.name;

        if (name === "rating") {
            if (newValue === "all") {
                newValue = undefined;
            } else {
                newValue = Number(newValue);
            }

        }

        this.filters[name] = newValue;

        this.loadWines();
    }

    handleSearch = (searchString) => {
        this.filters.searchWineryName = searchString;
        this.loadWines();

    }

    render() {
        return (
            <div className="text-align-center">
                <div className="filter-container">
                    <Search handleSearch={this.handleSearch}/>
                    <SortBy handleChange={this.handleChange}/>
                    <FilterByRating handleChange={this.handleChange}/>
                    <FilterByWine handleChange={this.handleChange}/>
                </div>
                <div>{this.renderedList()}</div>
            </div>
        );
    }
}
