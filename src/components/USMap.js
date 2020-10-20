import React, { memo } from "react";

import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = "./maps/usmap.json";

const USMap = ({setSelectedState}) => {

    const handleStateClick = (event) => {
        let clickedState = (
            event.target.className.baseVal
            .split(" ")[1]
            .split("-")
            .join(" ")
        )
        setSelectedState(clickedState)
    }

    return (
        <div className="map">
            <ComposableMap 
                className="us-map" 
                data-tip="" 
                height={90} 
                width={70} 
                projection="geoAlbers" 
                projectionConfig={{ scale: 175 }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map(geo => ( 
                        <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={geo.properties.NAME_1.split(" ").join("-")}
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

export default memo(USMap);