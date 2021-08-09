import React from 'react';
import { useParams } from 'react-router-dom';
import {QUERY_SINGLE_WINE} from "../utils/queries";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useQuery } from '@apollo/client';
import {Button} from "../components/Button/Button";
import "./assets/css/SingleWine.css";

const SingleWine = () => {
    const { wineId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_WINE, {
        variables: { wineId: wineId },
    });

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
                <div className="card-add-wine">
                    <div className="upload-image" style={imageStyle}>
                    </div>
                    <h1>

                    </h1>
                    <h2 className="capitalize">
                        {wine.wineType}
                    </h2>
                    <div>
                        <h2>Rating</h2>
                        <div
                            defaultValue={wine.rating}
                            className="rating"
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                        >
                            {wine.rating}
                        </div>
                    </div>
                    <div>
                        {wine.description}
                    </div>
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </div>
            </div>
        </>
    );
};

export default SingleWine;