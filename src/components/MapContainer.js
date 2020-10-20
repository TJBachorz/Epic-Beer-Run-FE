import React, {memo} from 'react'

import AlaskaMap from './AlaskaMap'
import HawaiiMap from './HawaiiMap'
import USMap from './USMap'
import NEMap from './NEMap'

export default function MapContainer({setSelectedState}) {
    return (
        <div className="map-container">
            <AlaskaMap className="alaska" setSelectedState={setSelectedState}/>
            <USMap className="us-map" setSelectedState={setSelectedState}/>
            <NEMap className="ne-map" setSelectedState={setSelectedState}/>
            <HawaiiMap className="hawaii-map" setSelectedState={setSelectedState}/>
        </div>
    )
}
