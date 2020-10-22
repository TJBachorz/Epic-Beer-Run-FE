import React from 'react';

import DestinationCardContainer from './DestinationCardContainer'

import { DragDropContext } from 'react-beautiful-dnd';

export default function RoadTrip({coordinates}) {

    const updateState = () => {
        console.log("updated state")
    }

    return (
        <div className="roadtrip">
            <DragDropContext onDragEnd={updateState}>
                <h1>Your Road Trip:</h1>
                <DestinationCardContainer 
                    id={1}
                    coordinates={coordinates}
                />
            </DragDropContext>
        </div>
    )
}
