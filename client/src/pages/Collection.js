import React from "react";

import WineList from "../components/WineList/WineList";
import {useQuery} from "@apollo/client";
import {QUERY_WINES} from "../utils/queries";

const Collection = () => {
    const { loading, data } = useQuery(QUERY_WINES);
    const wines = data?.wines || [];

    return (
        <di >
            <div className="image-bottles">
                <h1>Welcome to your cellar door!</h1>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <WineList
                wines={ wines}
                className="wineList"
                />
            )}
        </di>
    );
};

export default Collection;