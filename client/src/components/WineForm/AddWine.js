import React, { useState } from "react";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
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
                const result = cache.readQuery({ query: QUERY_WINES });
                let wines = [];
                if (result) {
                    wines = result.wines;
                }
                cache.writeQuery({
                    query: QUERY_WINES,
                    data: { wines: [addWine, ...wines ] },
                });

                window.location = "/";
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
                    rating: parseInt(formState.rating)/5,
                },
            });
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
            <div className="image-bottles">
                <h1>Wine Diary Entry</h1>
            </div>
            <div className="background-bottles">
                <div className="card-add-wine">

                    <form onSubmit={handleFormSubmit}>
                        <div className="upload-container">
                            <div className="upload-image">Upload</div>
                            <input type="file" className="upload-image-file" />
                        </div>

                        <div className="name-container">
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
                        </div>
                        <div className="wine-text-container">
                            <label>Rating:
                                <Rating name="rating"
                                        className="rating"
                                        size="large"
                                        defaultValue={2}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        onChange={handleFormChange}
                                />
                            </label>
                            <label>
                                Thoughts on the wine?
                                <textarea className="textarea-add-wine" name="description"
                                          onChange={handleFormChange}/>
                            </label>
                        </div>


                        <div className="text-align-center">
                            <Button type="submit" className="btn" sizebutton="btn--large"
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
