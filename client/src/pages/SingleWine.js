import React from 'react';
import { useParams } from 'react-router-dom';
import {QUERY_SINGLE_WINE, QUERY_WINES} from "../utils/queries";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {useMutation, useQuery} from '@apollo/client';
import {Button} from "../components/Button/Button";
import "./assets/css/SingleWine.css";
import {REMOVE_WINE} from "../utils/mutations";
import Auth from "../utils/auth";
import {getStarRatingString} from "../utils/ratings";

const SingleWine = () => {
    const { wineId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_WINE, {
        variables: { wineId: wineId },
    });

    const [removeWine, { removeError }] = useMutation(REMOVE_WINE, {
        update(cache, { data: { removeWine } }) {
            try {
                const result = cache.readQuery({ query: QUERY_WINES });
                let wines = [];
                if (result) {
                    wines = result.wines.filter((a) => a._id !== removeWine._id);
                }
                cache.writeQuery({
                    query: QUERY_WINES,
                    data: { wines: wines },
                });

                window.location = "/collection";
            } catch (e) {
                console.error(e);
            }
        },
    });

    const handleRemove = async (event) => {
        event.preventDefault();

        try {
            const mutationResponse = await removeWine({
                variables: {wineId: wineId}
            });
        } catch (e) {
            console.log(e);
        }
    };

    const wine = data?.wine || {};
    if (loading) {
        return <div>Loading...</div>
    }

    let imageStyle = wine.image ? {
        backgroundImage: 'url(' + wine.image + ')',
        backgroundSize: 'cover'
    } : {};

    return (
        <>
            <div className="image-bottles">
                <div className="padding-top">
                    <h1 className="single-wine-title">{wine.wineryName}</h1>
                </div>
            </div>
            <div className="background-bottles">
                <div className="card-single-wine">
                    <div className="upload-image" style={imageStyle}>
                    </div>
                    <h1 className="capitalize">
                        {wine.wineryName}
                    </h1>
                    <h2 className="capitalize">
                        {wine.wineType}
                    </h2>
                    <h2>
                        {wine.year}
                    </h2>
                    <h2>{wine.region}</h2>
                    <div>
                        <h2>Rating</h2>
                        <div
                            defaultValue={wine.rating}
                            className="rating"
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        >
                            {getStarRatingString(wine.rating)}
                        </div>
                    </div>
                    <div className="description-single-wine">
                        {wine.description}
                    </div>
                    <Button>Edit</Button>
                    <Button onClick={handleRemove}>Delete</Button>
                </div>
            </div>
        </>
    );
};

export default SingleWine;