import React, { Component, useState} from "react";

import "./assets/css/AddWine.css";
import {Button} from "../components/Button/Button";

class AddWine extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="background-bottles">

                    <div className="card-add-wine">
                        <h1>Wine Diary Entry</h1>
                        <div className="upload-image">Upload</div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Winery Name:
                                <input className="input-add-wine" type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <label>
                                Type of Wine:
                                <select className="select-add-wine" value={this.state.value} onChange={this.handleChange}>
                                    <option value="red-wine">Red Wine</option>
                                    <option value="white-wine">White Wine</option>
                                    <option value="rose-wine">Rosé Wine</option>
                                    <option value="sparkling-wine">Sparkling Wine</option>
                                    <option value="dessert-wine">Dessert Wine</option>
                                    <option value="fortified-wine">Fortified Wine</option>
                                </select>
                            </label>
                            <label>
                                Thoughts on the wine?
                                <textarea className="textarea-add-wine" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <div className="text-align-center">
                                <Button className="btn" buttonSize="btn--large" buttonStyle="btn--outline">Add</Button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className="background-white-wine">
                    <div className="card-add-wine-black">
                        <form onSubmit={this.handleSubmit}>
                            <h1>Advance Entry</h1>
                            <label>
                                Year:
                                <input className="input-add-wine" type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <label>
                                Region:
                                <input type="text" className="input-add-wine" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <label>
                                Taste:
                                <input type="text" className="input-add-wine" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <label>
                                <textarea className="textarea-add-wine" value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <div className="text-align-center">
                                <Button className="btn" buttonSize="btn--large" buttonStyle="btn--dark-red-wine">Add</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>



        )
    }
}

export default AddWine;