import React, { useState, useEffect } from 'react';
import { styled, css } from 'styled-components';
import { MdDone } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

const CheckSquare = styled.div`
    width: 20px;
    height: 20px;
    /* border-radius: 16px; */
    border: 2px solid #ff6b6b;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    color: #ff6b6b;

    /* ${(props) =>
        props.$state
            ? css`
                  animation: motion 0.3s linear 3s infinite alternate;
              `
            : ''} */

    animation: motion 0.3s linear -3s infinite alternate;

    @keyframes motion {
        0% {
            transform: rotate(5deg);
        }
        100% {
            transform: rotate(-5deg);
        }
    }
`;

function CheckSquareTemplate({ props }) {
    const dispatch = useTodoDispatch();
    const checked = useState(props.checked);
    const onToggle = () => {
        dispatch({ type: 'EDITCHECK', id: props.id, checked: !checked });
    };

    return (
        <>
            <CheckSquare onClick={onToggle}>{props.checked ? <MdDone /> : <></>}</CheckSquare>
        </>
    );
}

export default CheckSquareTemplate;
