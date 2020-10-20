import React from "react";

import {
    Marker,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

const geoUrl = "./maps/usmap.json";

const USMap = ({setSelectedState, coordinates}) => {

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
    );
};

export default USMap;