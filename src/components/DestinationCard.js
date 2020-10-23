import React from 'react'

import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';


const DestinationInfo = styled.div`
    background-image: url("https://cdnimg.webstaurantstore.com/images/products/large/202832/790435.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-flow: row wrap;
    justify-content:center;
    align-items:center;
    width: 200px;
    height: 100px;
    border: 2px solid gray;
    border-radius: 15px;
    background-color: white;
    margin: 1px;
    text-align:center;
`;

export default function DestinationCard({coordinate, index}) {
    const idToString = () => {
        if (typeof coordinate[2].id === String && coordinate[2].id !== undefined) {
            return coordinate[2].id
        } else {
            return coordinate[2].id.toString()
        }
    }

    return (
        <Draggable key={coordinate[2].id} draggableId={idToString()} index={index}>
            {provided => (
                <DestinationInfo 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="marker-info">
                    <p className="destination-name">
                        <a href={coordinate[2].website_url}
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            {coordinate[2].name}
                        </a>
                    </p>
                    <p className="destination-location">
                            {`${coordinate[2].city}, ${coordinate[2].state}`}
                    </p>
                    </div>
                </DestinationInfo>
            )}
        </Draggable>
    )
}
