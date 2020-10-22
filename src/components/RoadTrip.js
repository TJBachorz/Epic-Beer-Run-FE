import React from 'react';

import DestinationCardContainer from './DestinationCardContainer'

import { DragDropContext } from 'react-beautiful-dnd';

export default function RoadTrip({coordinates, setCoordinates}) {

    const updateCoordinates = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ) {
            return;
        }
    }

    return (
        <div className="roadtrip">
            <DragDropContext onDragEnd={updateCoordinates}>
                <h1>Your Road Trip:</h1>
                <DestinationCardContainer 
                    id={"1"}
                    coordinates={coordinates}
                />
            </DragDropContext>
        </div>
    )
}
