import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';

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
    /* display: none; */
`;

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
    padding-bottom: 5px;
    /* cursor: default; */
    &:hover {
        ${Remove} {
            display: initial;
        }
    }

    .textList {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        list-style: none;
        text-align: left;
        padding: 0;

        li:last-child {
            font-size: 0.8em;
            margin-top: 0.5em;
        }
    }
`;

const CheckCircle = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;

    ${(props) =>
        props.$done &&
        css`
            border: 1px solid #6699ff;
            color: #6699ff;
        `}
`;

const Text = styled.div`
    flex: 1;
    font-size: 1em;
    color: #495057;
    ${(props) =>
        props.$done &&
        css`
            color: #ced4da;

            li:nth-child(1) {
                text-decoration: line-through;
            }
        `}
`;

function TodoItem({ id, done, text, date }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id });
    const onDelete = () => dispatch({ type: 'DELETE', id });

    return (
        <TodoItemBlock>
            <CheckCircle $done={done} onClick={onToggle}>
                {done && <MdDone />}
            </CheckCircle>
            <Text $done={done}>
                <ul className="textList">
                    <li>{text}</li>
                    <li>{date}</li>
                </ul>
            </Text>
            <Remove onClick={onDelete}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    );
}

export default TodoItem;
