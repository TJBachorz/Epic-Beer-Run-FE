import React from 'react'

import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const DestinationInfo = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 150px;
    border: 1px solid black;
    background-color: white;
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
                    <h5 className="destination-name">{coordinate[2].name}</h5>
                    <p className="destination-location">{`${coordinate[2].city}, ${coordinate[2].state}`}</p>
                </DestinationInfo>
            )}
        </Draggable>
    )
}
