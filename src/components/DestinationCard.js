import React from 'react';

import { Draggable } from 'react-beautiful-dnd';


export default function DestinationCard({ coordinate, index }) {

    const idToString = () => {
        if (typeof coordinate[2].id === 'string' && coordinate[2].id !== undefined) {
            return coordinate[2].id
        } else {
            return coordinate[2].id.toString()
        }
    }

    return (
        <Draggable key={coordinate[2].id} draggableId={idToString()} index={index}>
            {provided => (
                <div
                    className="destination-stop"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <span className="stop-drag-handle">⠿</span>
                    <div className="stop-number">Stop {index + 1}</div>
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
                </div>
            )}
        </Draggable>
    )
}
