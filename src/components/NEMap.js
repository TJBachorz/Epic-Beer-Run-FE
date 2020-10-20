import React from 'react'

import {
    Marker,
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = './maps/nemap.json'

export default function NEMap({setSelectedState, coordinates}) {

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
                <Marker coordinates={coordinate}>
                    <circle r={1} fill="#E42" />
                </Marker>
                )
        })
    }

    return (
        <div>
            <ComposableMap data-tip="" className="nemap" projection={"geoAlbers"} projectionConfig={ {scale: 1800} }>
                <ZoomableGroup zoom={3} minZoom={3} maxZoom={3} center={[-74, -222]}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map(geo => ( 
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            className={geo.properties.gn_name.split(" ").join("-")}
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
                {setMarkers()}
            </ComposableMap>
        </div>
    )
}
