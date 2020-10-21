import React from 'react'

export default function BreweryCard({brewery, logCoordinates}) {

    const handleClick = () => {
        logCoordinates(brewery)
    }

    return (
        <section className={`card ${brewery.name}`}>
            <div className="card-info">
                <h5><a href={brewery.website_url}>{brewery.name}</a></h5>
                <button className="marker-button" onClick={handleClick}>
                    <img src="./maps/map-marker.webp" alt="map marker"/>
                </button>
                <p>{`${brewery.city}, ${brewery.state}`}</p>
            </div>
            <div>
            </div>
        </section>
    )
}
