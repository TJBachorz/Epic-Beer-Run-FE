import React from 'react'

export default function BreweryCard({brewery, logCoordinates}) {

    const handleClick = () => {
        logCoordinates(brewery)
    }

    return (
        <div className={`card ${brewery.name}`}>
            <h5><a href={brewery.website_url}>{brewery.name}</a></h5>
            <p>{`${brewery.city}, ${brewery.state}`}</p>
            <button onClick={handleClick}>Mark on Map</button>
        </div>
    )
}
