import React, {Component} from "react";
import {Button} from "./Button/Button";
import "./assets/css/Search.css";
import WineCard from "./WineCard/WineCard";

class Search extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
    }

    updateSearch(event) {
        this.setState({search: event.target.value.substr(0, 20)});
    }

    render() {
        // let searchWines = this.props.wines.filter(
        //     (wine) => {
        //         return wine.wineryName.indexOf(this.state.search) !== -1;
        //     }
        // )
        return (
            <div className="search-container">
                <form className="search-form">
                    {/*<ul>*/}
                    {/*    {searchWines.map((wine) => {*/}
                    {/*        return <WineCard*/}
                    {/*            wine={wine}*/}
                    {/*            key={wine._id} />*/}
                    {/*    })}*/}
                    {/*</ul>*/}
                    <input
                        value={this.state.search}
                        type="text"
                        className="search"
                        placeholder="Search for your wine"
                        name="search"
                        onChange={this.updateSearch.bind(this)}
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
}

export default Search;
