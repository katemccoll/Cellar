import React from "react";
import "./assets/css/Collection.css"

import WineList from "../components/WineList/WineList";
import {useQuery} from "@apollo/client";
import {QUERY_WINES} from "../utils/queries";

const Collection = () => {
    const { loading, data } = useQuery(QUERY_WINES);
    const wines = data?.wines || [];

    return (
        <div>
            <div className="image-bottles">
                <div className="padding-top">
                    <h1>Welcome to your cellar door!</h1>
                </div>

            </div>

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

export default Collection;
