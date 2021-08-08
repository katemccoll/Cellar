import React, { useState } from "react";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import "./AddWine.css";
import { Button } from "../Button/Button";
import { useMutation } from "@apollo/client";
import { ADD_WINE } from "../../utils/mutations";
import { QUERY_WINES } from "../../utils/queries";

const IMGUR_CLIENT_ID = '7f33f8df973fbc1';

const UploadImage = async (imageData) => {
    const formData = new FormData();
    imageData = await fetch(imageData).then(r => r.blob());
    formData.append('image', imageData);

    const headers = new Headers();
    headers.append("Authorization", `Client-ID ${IMGUR_CLIENT_ID}`);

    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formData,
        redirect: 'follow'
    };

    let res = await fetch("https://api.imgur.com/3/image", requestOptions);

    const {success, data: {link}} = await res.json()

    if (!success) {
        throw "Failed to upload image";
    }

    return link;
};

const AddWine = () => {
    const [formState, setFormState] = useState({
        wineryName: '',
        wineType: 'red-wine',
        description: '',
        image: null });

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

            // todo: validate form has all the data we need

            let imageUrl = null;

            if (formState.image) {
                imageUrl = await UploadImage(formState.image)
            }

            const { data } = await addWine({
                variables: {
                    wineryName: formState.wineryName,
                    wineType: formState.wineType,
                    year: formState.year,
                    region: formState.region,
                    description: formState.description,
                    image: imageUrl,
                    rating: parseInt(formState.rating)/5,
                },
            });
        } catch (e) {
            console.error(e);
        }
    };
    const handleFormChange = (event) => {
        let {name, value} = event.target;

        if (name === "image") {
            // We can't access the value form a file picker form, so we need to convert it with
            // this function.
            value = URL.createObjectURL(event.target.files[0]);
        }

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    let uploadImageStyle = {
        backgroundImage: 'url(' + formState.image + ')',
        backgroundSize: 'cover'
    };

    return (
        <>
            <div className="background-bottles">
                <div className="card-add-wine">
                    <h1>Wine Diary Entry</h1>

                    <form onSubmit={handleFormSubmit}>
                        <div className="upload-container">
                            <div className="upload-image" style={
                                formState.image && (
                                    uploadImageStyle
                                )
                            }></div>
                            <input type="file" accept="image/*" name="image" onChange={handleFormChange} />
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
                            <label>
                                Year:
                                <input
                                    className="input-add-wine"
                                    type="text"
                                    name="year"
                                       onChange={handleFormChange}/>
                            </label>
                            <label>
                                Region:
                                <input
                                    className="input-add-wine"
                                    type="text"
                                    name="region"
                                       onChange={handleFormChange}/>
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
                        <div className="text-align-center">
                            <Button type="submit" className="btn" sizebutton="btn--large"
                                    stylebutton="btn--outline">Add</Button>
                        </div>
                        {error && (
                            <div>
                                {error.message}
                            </div>
                        )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddWine;
