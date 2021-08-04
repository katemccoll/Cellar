import React from 'react';
import {Link, useParams} from 'react-router-dom'

import {useQuery} from "@apollo/client";
import {QUERY_SINGLE_WINE} from "../../utils/queries";


const WineCard = () => {
    const { wineId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_WINE, {
        variables: { wineId: wineId },
    });

    const wine = data?.wine || {};

    if (loading) {
        return <div>Loading</div>;
    }


    return (
            <div className="cardItem">
                <Link to={`/wines/${wine._id}`}>
                    <div>
                        <p>{wine.wineryName}</p>
                        <p>{wine.rating}</p>
                    </div>
                </Link>
            </div>
    );
};

export default WineCard;