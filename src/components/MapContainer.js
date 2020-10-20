import React, {memo} from 'react'

import AlaskaMap from './AlaskaMap'
import HawaiiMap from './HawaiiMap'
import USMap from './USMap'
import NEMap from './NEMap'

export default function MapContainer() {
    return (
        <div className="map-container">
            <AlaskaMap className="alaska"/>
            <USMap className="us-map"/>
            <NEMap className="ne-map"/>
            <HawaiiMap className="hawaii-map"/>
        </div>
    )
}
