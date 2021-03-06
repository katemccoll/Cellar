import React from 'react';
import {Link } from 'react-router-dom'
import './WineCard.css';
import {getStarRatingString} from '../../utils/ratings'

const WineCard = ({ wine }) => {

    const wineImage = wine.image == null ? {} :  {
        backgroundImage: 'url(' + wine.image + ')'
    };

    return (
        <div className="wine-card-container">
            <div className="cardItem">
                <Link to={`/wines/${wine._id}`}>
                    <div className="placeholder-image-wine" style={wineImage}>
                    </div>
                    <div className="wine-card-name">
                        <p className="capitalize">
                            {wine.wineryName}
                        </p>
                    </div>
                    <div>
                        {getStarRatingString(wine.rating)}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default WineCard;