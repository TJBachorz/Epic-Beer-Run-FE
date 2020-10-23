import React from 'react'

import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components'

import DestinationCard from './DestinationCard'

const DestinationList = styled.div`
    border: 4px solid gainsboro;
    display: flex;
    flex-direction: row;
    overflow: hidden;
    white-space: nowrap;
    width: 70%;
    margin: 20px;
    border-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
`;

export default function DestinationCardContainer({coordinates}) {

    return (
        <Droppable droppableId={"droppable-1"} direction={"horizontal"}>
            {provided => (
                <DestinationList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
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
                </DestinationList>
            )}
        </Droppable>
    )
}
