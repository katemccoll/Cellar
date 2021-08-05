import React from 'react';
import {Link } from 'react-router-dom'


const WineCard = ({ wine }) => {
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