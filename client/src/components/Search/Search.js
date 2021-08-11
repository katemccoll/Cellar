import React, { Component } from "react";
import { Button } from "../Button/Button";
import "./Search.css";


class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
        }

        this.props = props;
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value.substr(0, 20)});

    }

    onSubmit = (e) =>{
        e.preventDefault();
        this.props.handleSearch(this.state.search);
    }

    render() {
        return (
            <div className="search-container">
                <form className="search-form" onSubmit={this.onSubmit}>
                    <input
                        value={this.state.search}
                        type="text"
                        className="search"
                        placeholder="Search for your wine"
                        name="search"
                        onChange={this.updateSearch}
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
    };
}

export default Search;
