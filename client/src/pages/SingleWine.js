import React from 'react';
import { useParams } from 'react-router-dom';
import {QUERY_SINGLE_WINE} from "../utils/queries";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useQuery } from '@apollo/client';
import {Button} from "../components/Button/Button";

const SingleWine = () => {
    const { wineId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_WINE, {
        variables: { wineId: wineId },
    });

    const wine = data?.wine || {};
    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <>
            <div className="image-bottles">
                <h1>Wine Diary Entry</h1>
            </div>
            <div className="background-bottles">
                <div className="card-add-wine">
                    <div className="upload-image">
                        {wine.image}
                    </div>
                    <h1>
                        {wine.wineryName}
                    </h1>
                    <h2>
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