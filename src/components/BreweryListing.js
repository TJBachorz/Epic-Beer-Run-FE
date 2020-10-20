import React from 'react'

import BreweryCard from './BreweryCard'

export default function BreweryListing({breweries}) {


    // const cardMap = () => {
    //     return breweries.map(brewery => {
    //         return <BreweryCard key={brewery.id} brewery={brewery}/>
    //     })
    // }

    return (
        <div className="breweries-card-container">
            {/* {cardMap()} */}
        </div>
    )
}
