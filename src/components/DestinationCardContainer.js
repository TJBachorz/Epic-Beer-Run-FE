import React from 'react'

import { Droppable } from 'react-beautiful-dnd';

import DestinationCard from './DestinationCard'

export default function DestinationCardContainer({coordinates}) {

    const renderDestinationCards = () => {
        return coordinates.map(coordinate => {
            return <DestinationCard coordinate={coordinate}/>
        })
    }
    return (
        <div>
            {/* <Droppable droppableId={}>
                {renderDestinationCards()}
            </Droppable> */}
        </div>
    )
}
