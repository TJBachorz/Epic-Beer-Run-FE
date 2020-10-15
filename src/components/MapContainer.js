import React from 'react'

import AlaskaMap from './AlaskaMap'
import HawaiiMap from './HawaiiMap'
import MapChart from './MapChart'

export default function MapContainer() {
    return (
        <div className="map-container">
            <AlaskaMap className="alaska"/>
            <MapChart/>
            <h1>NEMAP placeholder</h1>
            <HawaiiMap/>
        </div>
    )
}
