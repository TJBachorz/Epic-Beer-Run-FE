import React from 'react'

import {
    Marker,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = './maps/nemap.json'

export default function NEMap({setSelectedState, coordinates, toolTip}) {

    const handleStateClick = (event) => {
        let clickedState = (
            event.target.className.baseVal
            .split(" ")[1]
            .split("-")
            .join(" ")
        )
        setSelectedState(clickedState)
    }

    const setMarkers = () => {
        return coordinates.map(coordinate => {
            return (
                <Marker 
                    coordinates={coordinate}
                    onMouseEnter={() => {
                        toolTip(`${coordinate[2].name}`);
                    }}
                    onMouseLeave={() => {
                        toolTip("");
                    }}>
                    <circle r={1} fill="#E42"/>    
                </Marker>
            )
        })
    }

    return (
        <div>
            <ComposableMap 
                className="nemap" 
                projection={"geoAlbers"}
                height={125}
                width={120}
                projectionConfig={ {center:[23, -222], scale: 800} }
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => ( 
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            className={
                                geo.properties.gn_name
                                .split(" ").join("-")
                            }
                            onClick={handleStateClick}
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
                {setMarkers()}
            </ComposableMap>
        </div>
    )
}
