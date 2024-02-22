import React from 'react';
import styled from 'styled-components';
import { useTodoDispatch } from '../TodoContext';
import { MdDelete } from 'react-icons/md';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 1.2em;
    cursor: pointer;
    &:hover {
        color: #ff6b6b;
    }
`;

function RemoveTemplate({ props }) {
    console.log(props);
    const dispatch = useTodoDispatch();
    const onDelete = () => dispatch({ type: 'DELETE', id: props.id });
    return (
        <>
            <Remove onClick={onDelete}>
                <MdDelete />
            </Remove>
        </>
    );
}

export default RemoveTemplate;
