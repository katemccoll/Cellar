import React from 'react';
import WineItem from "../WineItem/WineItem";

const WineList = () => {

    // if (!wines.length) {
    //     return <h3>No Wines Yet</h3>;
    // }

    return (
        <div>
            {/*{wines && wines.map((wine) => (*/}
            {/*    <div>*/}
            {/*        <WineItem />*/}
            {/*    </div>*/}
            {/*))}*/}
            <WineItem />
        </div>
    )
}

export default WineList;