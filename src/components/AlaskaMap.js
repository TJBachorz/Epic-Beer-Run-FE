import React from 'react'

import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = "./alaska_and_hawaii.json";


export default function AlaskaMap() {
    return (
        <div>
            <ComposableMap data-tip="" className="alaska" projection="geoAlbers" projectionConfig={{ scale: 1100 }}>
                <ZoomableGroup center={[-150, 55]} minZoom={1} maxZoom={1} translateExtent={[[-300, 15], [-300, 15]]}>
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
