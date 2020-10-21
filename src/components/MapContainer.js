import React, {useState} from 'react'

import AlaskaMap from './AlaskaMap'
import HawaiiMap from './HawaiiMap'
import USMap from './USMap'
import NEMap from './NEMap'

import ReactTooltip from "react-tooltip";

export default function MapContainer({setSelectedState, coordinates}) {

    const [toolTipContent, setToolTipContent] = useState("")

    return (
        <div className="map-container">
            <AlaskaMap 
                className="alaska" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
                toolTip={setToolTipContent}
            />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <USMap 
                className="us-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
                toolTip={setToolTipContent}
            />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <NEMap 
                className="ne-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
                toolTip={setToolTipContent}
            />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <HawaiiMap 
                className="hawaii-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
        </div>
    )
}
