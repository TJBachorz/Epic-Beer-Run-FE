import React from 'react'

import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const DestinationInfo = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    margin: 5px;
`;

export default function DestinationCard({coordinate, index}) {

    return (
        <Draggable key={coordinate[2].id} draggableId={coordinate[2].id.toString()} index={index}>
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
