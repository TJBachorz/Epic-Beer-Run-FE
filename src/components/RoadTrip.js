import React from 'react';

import DestinationCardContainer from './DestinationCardContainer';

import { DragDropContext } from 'react-beautiful-dnd';

export default function RoadTrip({ coordinates, setCoordinates }) {

    const findCoordinatesByID = (draggableId) => {
        return coordinates.find(
            coordinate => coordinate[2].id === +draggableId
        )
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

        const migratingCoordinates = findCoordinatesByID(draggableId);
        if (!migratingCoordinates) return;
        const newCoordinates = Array.from(coordinates);
        newCoordinates.splice(source.index, 1);
        newCoordinates.splice(destination.index, 0, migratingCoordinates);
        setCoordinates(newCoordinates);
    }

    return (
        <div className="roadtrip-panel">
            <div className="roadtrip-panel-header">
                <div>
                    <h2 className="roadtrip-title">Your Road Trip</h2>
                    <p className="roadtrip-subtitle">Drag to reorder your stops</p>
                </div>
                <button className="directions-button">Get Directions ↗</button>
            </div>
            <DragDropContext onDragEnd={updateCoordinates}>
                <DestinationCardContainer
                    coordinates={coordinates}
                />
            </DragDropContext>
        </div>
    )
}
