import React from 'react';
import {Link } from 'react-router-dom'
import './WineCard.css';


const WineCard = ({ wine }) => {
    return (
        <div className="wine-card-container">
            <div className="cardItem">
                <Link to={`/wines/${wine._id}`}>
                    <div className="placeholder-image-wine">
                        {wine.image}
                    </div>
                    <div>
                        <p>{wine.wineryName}</p>
                        <p>{wine.rating}</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default WineCard;