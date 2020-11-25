import React, { useState, useEffect } from 'react';

import AlaskaMap from './AlaskaMap';
import HawaiiMap from './HawaiiMap';
import USMap from './USMap';
import NEMap from './NEMap';

import ReactTooltip from "react-tooltip";

export default function MapContainer({ setSelectedState, coordinates }) {

    const [toolTipContent, setToolTipContent] = useState("")
    
    useEffect(() => {
        setTimeout(() => { 
            const loadingGif = document.querySelector(".loading")
            loadingGif.remove()
        }, 6000);
    }, []);

    return (
        <div className="map-container">
            <AlaskaMap 
                className="alaska" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <img className="loading" src="./loading.gif" alt="loading"/>
            <USMap 
                className="us-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
                toolTip={setToolTipContent}
                toolTipContent={toolTipContent}
            />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <NEMap 
                className="ne-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
            <HawaiiMap 
                className="hawaii-map" 
                setSelectedState={setSelectedState}
            />
        </div>
    )
}
