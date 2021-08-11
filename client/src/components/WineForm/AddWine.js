import React, { useState } from "react";
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import "./AddWine.css";
import { Button } from "../Button/Button";
import { useMutation } from "@apollo/client";
import { ADD_WINE } from "../../utils/mutations";
import { QUERY_WINES } from "../../utils/queries";

const IMGUR_CLIENT_ID = '7f33f8df973fbc1';
const RATING_STARS = 5;

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
        image: null,
        rating: 0,
        year: '',
        region: ''
    });

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

                window.location = "/collection";
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {

            let imageUrl = null;
            if (formState.image) {
                imageUrl = await UploadImage(formState.image)
            }

            await addWine({
                variables: {
                    wineryName: formState.wineryName,
                    wineType: formState.wineType,
                    year: parseInt(formState.year) || null,
                    region: formState.region,
                    description: formState.description,
                    image: imageUrl,
                    rating: parseInt(formState.rating)/RATING_STARS,
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
        } else {
            value = event.target.validity.valid ? value : formState[name];
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
                    <form onSubmit={handleFormSubmit}>
                        <div className="upload-container">
                            <div className="upload-image" style={
                                formState.image && (
                                    uploadImageStyle
                                )
                            }></div>
                            <label>Upload your photo:</label>
                            <input className="choose-file" type="file" accept="image/*" name="image" onChange={handleFormChange} />
                        </div>

                        <div className="name-container">
                            <label>
                                Winery Name:
                                <input className="input-add-wine" type="text" name="wineryName"
                                       onChange={handleFormChange} value={formState.wineryName} required/>
                            </label>
                            <label>
                                Type of Wine:
                                <select className="select-add-wine" name="wineType"
                                        onChange={handleFormChange} value={formState.wineType}>
                                    <option defaultValue="Red Wine">Red Wine</option>
                                    <option value="White Wine">White Wine</option>
                                    <option value="Rosé Wine">Rosé Wine</option>
                                    <option value="Sparkling Wine">Sparkling Wine</option>
                                    <option value="Dessert Wine">Dessert Wine</option>
                                    <option value="Fortified Wine">Fortified Wine</option>
                                </select>
                            </label>
                            <label>
                                Year:
                                <input
                                    type="text"
                                    className="input-add-wine"
                                    pattern="[0-9]*"
                                    name="year"
                                    onChange={handleFormChange} value={formState.year}/>
                            </label>
                            <label>
                                Region:
                                <input
                                    className="input-add-wine"
                                    type="text"
                                    name="region"
                                    onChange={handleFormChange} value={formState.region}/>
                            </label>
                        </div>
                        <div className="wine-text-container">
                            <label>Rating:
                                <div>
                                    <Rating name="rating"
                                            className="rating"
                                            size="large"
                                            defaultValue={0}
                                            precision={1}
                                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                            onChange={handleFormChange}
                                    />
                                </div>

                            </label>
                        <label>
                            Thoughts on the wine?
                            <textarea className="textarea-add-wine" name="description"
                                      onChange={handleFormChange} value={formState.description}/>
                        </label>
                        <div className="text-align-center">
                            <Button type="submit" className="btn add-wine-button" sizebutton="btn--large"
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
