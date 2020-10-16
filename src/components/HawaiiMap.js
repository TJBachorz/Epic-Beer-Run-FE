import React from 'react'

import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = "./alaska_and_hawaii.json";


export default function HawaiiMap() {
    return (
        <div>
            <ComposableMap data-tip="" className="hawaii" projection={"geoAlbers"} projectionConfig={ {scale:1100} }>
                <ZoomableGroup zoom={3} center={[-135, -190]}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map(geo => ( 
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            className={geo.properties.abbrev}
                            onClick={(event) => console.log(event.target.className.baseVal.split(" ")[1]) }
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
