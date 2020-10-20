import React from 'react'

import BreweryCard from './BreweryCard'

export default function BreweryListing({breweries, selectedState, logCoordinates}) {

    const filterBreweriesBySelectedState = () => {
        return breweries.filter(brewery => {
            return brewery.state === selectedState
        })
    }

    const cardMap = () => {
        if (selectedState) {
            const breweriesList = filterBreweriesBySelectedState()
            return breweriesList.map(brewery => {
                return (
                    <BreweryCard 
                        key={brewery.id} 
                        brewery={brewery}
                        logCoordinates={logCoordinates}
                    />
                )
            })
        }   
    }

    return (
        <div className="grid-container">
            <h5 className="use-explanation">Select a state to see it's breweries</h5>
            <h6 className="disclaimer"><em>***only breweries with available long/lat data are provided***</em></h6>
            <div className="breweries-card-container">
                {cardMap()}
            </div>
        </div>
    )
}
