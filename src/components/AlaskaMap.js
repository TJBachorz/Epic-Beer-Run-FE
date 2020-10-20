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
                className="alaska" 
                projection="geoAlbers" 
                height={125}
                width={120}
                projectionConfig={{ center:[-50, 55], scale: 200 }}
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
            </ComposableMap>
        </div>
    )
}
