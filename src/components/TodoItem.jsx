import React from 'react';
import styled, { css } from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { useTodoDispatch } from '../TodoContext';
import CheckCircleTemplate from './CheckCircleTemplate';

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
    height: 75px;
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

    const onDelete = () => dispatch({ type: 'DELETE', id });
    return (
        <TodoItemBlock>
            <CheckCircleTemplate $done={done} id={id} props={{ done: done, id: id }} />
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
