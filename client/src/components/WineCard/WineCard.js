import React from 'react';
import {Link } from 'react-router-dom'
import './WineCard.css';

const MAX_STARS = 5;


const WineCard = ({ wine }) => {

    const wineImage = wine.image == null ? {} :  {
        backgroundImage: 'url(' + wine.image + ')'
    };

    const numberStars = wine.rating > 0 && wine.rating <= MAX_STARS ? Math.floor(MAX_STARS * wine.rating) : 0;
    const ratingString = numberStars > 0 ? '★'.repeat(numberStars) : '-';

    return (
        <div className="wine-card-container">
            <div className="cardItem">
                <Link to={`/wines/${wine._id}`}>
                    <div className="placeholder-image-wine" style={wineImage} >

                    </div>
                    <div className="wine-card-name">
                        <p className="capitalize">{wine.wineryName}</p>
                    </div>
                    <div>
                        {ratingString}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default WineCard;