import React, {Component} from 'react';
import WineCard from "../WineCard/WineCard";
import "./WineList.css"
import Search from "../Search";
import FilterByRating from "../FilterByRating";
import FilterByWine from "../FilterByWine";
import SortBy from "../Sort-By";
import {QUERY_WINES} from "../../utils/queries";


export default class WineList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            rating: 0,
            wines: props.wines
        }

        this.client = props.client
    }

    renderedList() {
        return (
            <>
                {
                    this.state.wines.map((wine) => {
                        if (!this.props.wines.length) {
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

    handleChange = (e) => {

        let newValue = e.target.value;
        let name = e.target.name;

        if (name === "rating") {
            newValue = Number(newValue);
        }

        this.client.query({query: QUERY_WINES, fetchPolicy: 'no-cache',
            variables: { filters: { [e.target.name]: newValue }}
        }).then((res) => {
            this.setState(prevState => ({
                ...prevState,
                wines: res.data.wines,
            }));
        });
    }

    render() {
        return (
            <div className="text-align-center">
                <div className="filter-container">
                    <Search/>
                    <SortBy/>
                    <FilterByRating handleChange={this.handleChange}/>
                    <FilterByWine/>
                </div>
                <div>{this.renderedList()}</div>
            </div>
        );
    }
}
