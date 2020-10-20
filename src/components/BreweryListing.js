import React from 'react'

import BreweryCard from './BreweryCard'

export default function BreweryListing({breweries, selectedState}) {

    const filterBreweriesBySelectedState = () => {
        return breweries.breweryDB.filter(brewery => brewery.state === selectedState)
    }

    const cardMap = () => {
        if (selectedState) {
            const breweriesList = filterBreweriesBySelectedState()
            return breweriesList.map(brewery => {
                return <BreweryCard key={brewery.id} brewery={brewery}/>
            })
        }   
    }

    return (
        <div className="grid-container">
            <div className="breweries-card-container">
                {cardMap()}
            </div>
        </div>
    )
}
