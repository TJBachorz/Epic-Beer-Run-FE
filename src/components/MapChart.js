import React, { memo } from "react";

import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = "./usmap.json";

const MapChart = () => {
    return (
        <div className="map">
            <ComposableMap data-tip="" height={100} width={75} projection="geoAlbers" projectionConfig={{ scale: 200 }}>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => ( 
                        <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={geo.properties.NAME_1}
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
            </ComposableMap>
        </div>
    );
};

export default memo(MapChart);