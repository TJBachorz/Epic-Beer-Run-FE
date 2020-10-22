import React from 'react';

import DestinationCardContainer from './DestinationCardContainer'

import { DragDropContext } from 'react-beautiful-dnd';

export default function RoadTrip({coordinates}) {

    const updateState = () => {
        console.log("updated state")
    }

    return (
        <div className="roadtrip">
            <h1>Your Road Trip:</h1>
            <DragDropContext onDragEnd={updateState}>
                <DestinationCardContainer coordinates={coordinates}/>
            </DragDropContext>
        </div>
    )
}
