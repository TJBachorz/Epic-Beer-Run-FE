import React from 'react'

import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = './maps/nemap.json'

export default function NEMap({setSelectedState}) {

    const handleStateClick = (event) => {
        let clickedState = (
            event.target.className.baseVal.
            split(" ")[1]
            .split("-")
            .join(" ")
        )
        setSelectedState(clickedState)
    }

    return (
        <div>
            <ComposableMap data-tip="" className="nemap" projection={"geoAlbers"} projectionConfig={ {scale: 1800} }>
                <ZoomableGroup zoom={3} center={[-74, -222]}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map(geo => ( 
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            className={geo.properties.gn_name.split(" ").join("-")}
                            onClick={(event) => console.log(event.target.className.baseVal.split(" ")[1].split("-").join(" ")) }
                            // onMouseEnter={() => {
                            //     // const { NAME_1} = geo.properties;
                            //     // setTooltipContent(`${NAME_1}`);
                            // }}
                            // onMouseLeave={() => {
                            //     setTooltipContent("");
                            // }}
                            style={{
                                default: {
                                fill: "#E42",
                                outline: "none"
                                },
                                hover: {
                                fill: "black",
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
