import React from 'react';

import DestinationCardContainer from './DestinationCardContainer'

import { DragDropContext } from 'react-beautiful-dnd';
import octopusImage from '../octopus-beer.jpg'

export default function RoadTrip({coordinates, setCoordinates}) {

    const findCoordinatesByID = (draggableId) => {
        return coordinates.find(coordinate => coordinate[2].id === +draggableId)
    }

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
        
        const migratingCoordinates = findCoordinatesByID(draggableId)
        const newCoordinates = Array.from(coordinates);
        newCoordinates.splice(source.index, 1);
        newCoordinates.splice(destination.index, 0, migratingCoordinates);
        setCoordinates(newCoordinates);
    }

    return (
        <div className="roadtrip">
            <DragDropContext onDragEnd={updateCoordinates}>
                <div className="road-trip-header">
                    <h1>Your Road Trip:</h1>
                    <img src={octopusImage} alt="Octopus holding a beer in each of its tentacles"/>
                </div>
                <DestinationCardContainer 
                    coordinates={coordinates}
                />
            </DragDropContext>
        </div>
    )
}
