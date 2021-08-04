import React, { useState } from "react";

import "./AddWine.css";
import { Button } from "../Button/Button";
import { useMutation } from "@apollo/client";
import { ADD_WINE } from "../../utils/mutations";
import { QUERY_WINES } from "../../utils/queries";


const AddWine = () => {
    const [formState, setFormState] = useState({ wineryName: '', wineType: 'red-wine', description: '' });
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
            const { data } = await addWine({
                variables: {
                    wineryName: formState.wineryName,
                    wineType: formState.wineType,
                    description: formState.description,
                    image: null, // todo: add image
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
        <>
            <div className="background-bottles">
                <div className="card-add-wine">
                    <h1>Wine Diary Entry</h1>
                    <div className="upload-image">Upload</div>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Winery Name:
                            <input className="input-add-wine" type="text" name="wineryName"
                                   onChange={handleFormChange}/>
                        </label>
                        <label>
                            Type of Wine:
                            <select className="select-add-wine" name="wineType"
                                    onChange={handleFormChange}>
                                <option defaultValue="red-wine">Red Wine</option>
                                <option value="white-wine">White Wine</option>
                                <option value="rose-wine">Rosé Wine</option>
                                <option value="sparkling-wine">Sparkling Wine</option>
                                <option value="dessert-wine">Dessert Wine</option>
                                <option value="fortified-wine">Fortified Wine</option>
                            </select>
                        </label>
                        <div>
                            <label>Rate this wine:</label>
                            <div className="rating">
                                <input type="radio" name="rating" id="rating-5" />
                                <label htmlFor="rating-5">GREAT</label>
                                <input type="radio" name="rating" id="rating-4" />
                                <label htmlFor="rating-4"></label>
                                <input type="radio" name="rating" id="rating-3" />
                                <label htmlFor="rating-3"></label>
                                <input type="radio" name="rating" id="rating-2" />
                                <label htmlFor="rating-2"></label>
                                <input type="radio" name="rating" id="rating-1" />
                            </div>
                        </div>
                        <label>
                            Thoughts on the wine?
                            <textarea className="textarea-add-wine" name="description"
                                      onChange={handleFormChange}/>
                        </label>
                        <div className="text-align-center">
                            <Button className="btn" sizebutton="btn--large"
                                    stylebutton="btn--outline">Add</Button>
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
    );
};

export default AddWine;
