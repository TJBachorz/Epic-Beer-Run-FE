import React from 'react'

export default function DestinationCard({coordinate}) {

    return (
        <div className="destination-card">
            <h5 className="destination-name">{coordinate[2].name}</h5>
            <p className="destination-location">{`${coordinate[2].city}, ${coordinate[2].state}`}</p>
        </div>
    )
}
