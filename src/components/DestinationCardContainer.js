import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import DestinationCard from './DestinationCard';

const DestinationList = styled.div`
    border: 4px solid gainsboro;
    display: flex;
    flex-direction: row;
    overflow: auto;
    width: 850px;
    margin: 20px;
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
