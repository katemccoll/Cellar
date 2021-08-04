import React from 'react';
import { useParams } from 'react-router-dom';
import {QUERY_SINGLE_WINE} from "../utils/queries";

import { useQuery } from '@apollo/client';

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
            <div className="background-bottles">
                <div className="card-add-wine">
                    <h1>
                        {wine.wineryName}
                    </h1>
                    <h2>
                        {wine.wineType}
                    </h2>
                    <div className="upload-image">Upload</div>
                    <div>
                        {wine.description}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleWine;