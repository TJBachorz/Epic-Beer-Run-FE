import React from 'react'

import { Droppable } from 'react-beautiful-dnd';

import DestinationCard from './DestinationCard'

export default function DestinationCardContainer({coordinates, id}) {

    return (
        <Droppable droppableId={id}>
            {provided => (
                <ul
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                    className="destination-card-container"
                >
                    {coordinates.map((coordinate, index) => {
                        return (
                            <DestinationCard 
                                key={coordinate[2].id} 
                                coordinate={coordinate}
                                index={index}
                            />
                        )
                    })} 
                    {provided.placeholder}       
                </ul>
            )}
        </Droppable>
    )
}
