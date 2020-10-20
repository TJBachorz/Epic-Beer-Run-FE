import React, {memo} from 'react'

import AlaskaMap from './AlaskaMap'
import HawaiiMap from './HawaiiMap'
import USMap from './USMap'
import NEMap from './NEMap'

export default function MapContainer({setSelectedState, coordinates}) {
    return (
        <div className="map-container">
            <AlaskaMap 
                className="alaska" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
            <USMap 
                className="us-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
            <NEMap 
                className="ne-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
            <HawaiiMap 
                className="hawaii-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
        </div>
    )
}
