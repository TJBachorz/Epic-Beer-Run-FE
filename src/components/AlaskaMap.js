import React from 'react'

import {
    Marker,
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = "./maps/alaska_and_hawaii.json";


export default function AlaskaMap({setSelectedState}) {

    const handleStateClick = (event) => {
        let clickedState = event.target.className.baseVal.split(" ")[1]
        setSelectedState(clickedState)
    }

    return (
        <div>
            <ComposableMap 
                data-tip="" 
                className="alaska" 
                projection="geoAlbers" 
                projectionConfig={{ scale: 1100 }}
            >
                <ZoomableGroup 
                    center={[-150, 55]} 
                    minZoom={1} 
                    maxZoom={1} 
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map(geo => ( 
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            className={geo.properties.abbrev}
                            onClick={handleStateClick}
                            // onMouseEnter={() => {
                            //     // const { NAME_1} = geo.properties;
                            //     // setTooltipContent(`${NAME_1}`);
                            // }}
                            // onMouseLeave={() => {
                            //     setTooltipContent("");
                            // }}
                            style={{
                                default: {
                                fill: "#104547",
                                outline: "none"
                                },
                                hover: {
                                fill: "#23C9FF",
                                outline: "none"
                                },
                                pressed: {
                                fill: "#E42",
                                outline: "none"
                                }
                            }}
                            />
                        ))
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}
