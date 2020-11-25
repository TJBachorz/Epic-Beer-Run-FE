import React from 'react';

import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = "./maps/alaska_and_hawaii.json";

export default function HawaiiMap({ setSelectedState }) {


    const handleStateClick = (event) => {
        let clickedState = event.target.className.baseVal.split(" ")[1]
        setSelectedState(clickedState)
    }
    
    return (
        <div>
            <ComposableMap 
                className="hawaii" 
                projection={"geoAlbers"} 
                height={325}
                width={320}
                projectionConfig={{center:[-60, -337], scale:1500}}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => ( 
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            className={geo.properties.abbrev}
                            onClick={handleStateClick}
                            style={{
                                default: {
                                fill: "#104547",
                                outline: "none"
                                },
                                hover: {
                                fill: "#FF9E0A",
                                outline: "none"
                                },
                                pressed: {
                                fill: "#f3bd6a",
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
