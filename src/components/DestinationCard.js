import React from 'react'

import { Draggable } from 'react-beautiful-dnd';

export default function DestinationCard({coordinate, index}) {

    return (
        <Draggable draggableId={coordinate[2].id} index={index}>
            {provided => (
                <li 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    innerRef={provided.innerRef}
                    className="destination-card"
                >
                    <h5 className="destination-name">{coordinate[2].name}</h5>
                    <p className="destination-location">{`${coordinate[2].city}, ${coordinate[2].state}`}</p>
                </li>
            )}
        </Draggable>
    )
}
