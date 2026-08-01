import React from 'react';

export default function BreweryCard({ brewery, logCoordinates }) {

    const handleClick = () => {
        logCoordinates(brewery)
    }

    return (
        <section className={`card ${brewery.name}`}>
            <div className="card-info">
                <h5>
                    {brewery.website_url ? (
                        <a href={brewery.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {brewery.name}
                            <span className="external-link-icon" aria-hidden="true">↗</span>
                        </a>
                    ) : (
                        <span className="name-no-link">{brewery.name}</span>
                    )}
                </h5>
                <p>{`${brewery.city}, ${brewery.state}`}</p>
                <button className="marker-button" onClick={handleClick}>
                    <span role="img" aria-label="pin">📍</span> Pin
                </button>
            </div>
        </section>
    )
}
