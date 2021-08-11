import React, {Component} from 'react';
import WineCard from "../WineCard/WineCard";
import "./WineList.css"
import Search from "../Search";
import FilterByRating from "../FilterByRating";
import FilterByWine from "../FilterByWine";
import SortBy from "../Sort-By";
import CircularStatic from "../Loading";
import {QUERY_WINES} from "../../utils/queries";


export default class WineList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            rating: 0,
            wines: [],
            filters: {}
        }

        this.client = props.client;
        this.loadWines();
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
            variables: { filters: this.state.filters}
        }).then((res) => {

            this.setState(prevState => ({
                ...prevState,
                loading: false,
                wines: res.data.wines,
            }));
        });
    }

    handleChange = (e) => {
        let newValue = e.target.value;
        let name = e.target.name;

        if (name === "rating") {
            newValue = Number(newValue);
        }

        this.setState(prevState => ({
            ...prevState,
            filters: {
                ...prevState.filters,
                [name]: newValue
            }
        }));
    }

    render() {
        return (
            <>
            {
                this.state.loading ? (
                <CircularStatic />
            ) : (
                <div className="text-align-center">
                    <div className="filter-container">
                        <Search/>
                        <SortBy/>
                        <FilterByRating handleChange={this.handleChange}/>
                        <FilterByWine/>
                    </div>
                    <div>{this.renderedList()}</div>
                </div>
            )}
            </>
        );
    }
}
