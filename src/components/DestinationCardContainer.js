import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import DestinationCard from './DestinationCard';

export default function DestinationCardContainer({ coordinates }) {

    return (
        <Droppable droppableId={"droppable-1"} direction={"horizontal"}>
            {provided => (
                <div
                    className="destination-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {coordinates.map((coordinate, index) => (
                        <React.Fragment key={coordinate[2].id}>
                            {index > 0 && <span className="stop-arrow">→</span>}
                            <DestinationCard
                                coordinate={coordinate}
                                index={index}
                            />
                        </React.Fragment>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
