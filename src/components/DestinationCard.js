import React from 'react'

import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const DestinationInfo = styled.div`
    display: flex
    justify-content:center;
    align-items:center;
    width: 200px;
    height: 100px;
    white-space: nowrap;
    overflow: auto;
    border: 2px solid black;
    border-radius: 15px;
    background-color: white;
    margin: 1px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
    text-align:center;
`;

export default function DestinationCard({coordinate, index}) {
    const idToString = () => {
        if (typeof coordinate[2].id === String && coordinate[2].id !== undefined) {
            return coordinate[2].id
        } else {
            return coordinate[2].id.toString()
        }
    }

    return (
        <Draggable key={coordinate[2].id} draggableId={idToString()} index={index}>
            {provided => (
                <DestinationInfo 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="marker-info">
                        <h5 className="destination-name">
                            <a href={coordinate[2].website_url}
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {coordinate[2].name}
                            </a>
                        </h5>
                        <p className="destination-location">
                                {`${coordinate[2].city}, ${coordinate[2].state}`}
                        </p>
                    </div>
                </DestinationInfo>
            )}
        </Draggable>
    )
}
