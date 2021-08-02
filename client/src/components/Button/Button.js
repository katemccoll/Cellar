import React from "react";
import './Button.css';

import {Link} from "react-router-dom";


const STYLES = [
    'btn--primary',
    'btn--outline',
    'btn--dark-red-wine'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({
    children,
    type,
    onClick,
    link,
    stylebutton,
    sizebutton
}) => {
    const checkStylebutton = STYLES.includes(stylebutton) ? stylebutton : STYLES[0];
    const checkSizebutton = SIZES.includes(sizebutton) ? sizebutton : SIZES[0];
    return (
        <>
            {
              link
                ? <Link to={`${link}`} className={`btn ${type} ${checkStylebutton} ${checkSizebutton}`}>
                      {children}
                  </Link>
                : <button className={`btn ${checkStylebutton} ${checkSizebutton}`}>
                      {children}
                  </button>

            }
        </>
    );
};