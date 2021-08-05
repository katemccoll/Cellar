import React from "react";

import WineList from "../components/WineList/WineList";
import {useQuery} from "@apollo/client";
import {QUERY_WINES} from "../utils/queries";

const ViewWine = () => {
    const { loading, data } = useQuery(QUERY_WINES);
    const wines = data?.wines || [];

    let scrollTimeout = null;
    let wineList = document.querySelector("wineList");

    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            wineList.classList.add('-scrolled');
        } else {
            clearTimeout(scrollTimeout);
        }

        scrollTimeout = setTimeout(() => {
            wineList.classList.remove('-scrolled');
            scrollTimeout = null;
        }, 150);
    });

    return (
        <div>
            <h1>Welcome to your cellar door!</h1>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <WineList
                wines={ wines}
                className="wineList"
                />
            )}
        </div>
    );
};

export default ViewWine;