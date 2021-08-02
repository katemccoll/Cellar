import React, { useState } from "react";

import "./assets/css/AddWine.css";
import {Button} from "../components/Button/Button";
import {useMutation} from "@apollo/client";
import {ADD_WINE} from "../../utils/mutations";
import {QUERY_WINES} from "../../utils/queries";

const AddWine = () => {
    const [formState, setFormState] = useState('');
    const [addWine, { error }] = useMutation(ADD_WINE, {
        update(cache, { data: { addWine } }) {
            try {
                const { wines } = cache.readQuery({ query: QUERY_WINES });

                cache.writeQuery({
                    query: QUERY_WINES,
                    data: { wines: [addWine, ...wines ] },
                });
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await addWine({
                variables: {
                    wineName: formState.wineName,
                    wineType: formState.wineType,
                    wineText: formState.wineText,
                },
            });
            setFormState('');
        } catch (e) {
            console.error(e);
        }
    };
    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    <div className="background-bottles">
                        <div className="card-add-wine">
                            <h1>Wine Diary Entry</h1>
                            <div className="upload-image">Upload</div>
                            <form onSubmit={handleFormSubmit}>
                                <label>
                                    Winery Name:
                                    <input className="input-add-wine" type="text" value={this.state.value}
                                           onChange={handleFormChange}/>
                                </label>
                                <label>
                                    Type of Wine:
                                    <select className="select-add-wine" value={this.state.value}
                                            onChange={handleFormChange}>
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
                                    <textarea className="textarea-add-wine" value={this.state.value}
                                              onChange={handleFormChange}/>
                                </label>
                                <div className="text-align-center">
                                    <Button className="btn" buttonSizes="btn--large"
                                            buttonStyle="btn--outline">Add</Button>
                                </div>
                                {error && (
                                    <div>
                                        {error.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                    <div className="background-white-wine">
                        <div className="card-add-wine-black">
                            <form onSubmit={handleFormSubmit}>
                                <h1>Advance Entry</h1>
                                <label>
                                    Year:
                                    <input className="input-add-wine" type="text" value={this.state.value}
                                           onChange={handleFormChange}/>
                                </label>
                                <label>
                                    Region:
                                    <input type="text" className="input-add-wine" value={this.state.value}
                                           onChange={handleFormChange}/>
                                </label>
                                <label>
                                    Taste:
                                    <input type="text" className="input-add-wine" value={this.state.value}
                                           onChange={handleFormChange}/>
                                </label>
                                <label>
                                    <textarea className="textarea-add-wine" value={this.state.value}
                                              onChange={handleFormChange}/>
                                </label>
                                <div className="text-align-center">
                                    <Button className="btn" buttonSizes="btn--large"
                                            buttonStyle="btn--dark-red-wine">Add</Button>
                                </div>
                                {error && (
                                    <div>
                                        {error.message}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <p>
                    You Need to be logged in to use this amazing app.
                </p>
            )}
        </div>
    );
}
