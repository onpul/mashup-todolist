import React from 'react';
import styled, { css } from 'styled-components';
import { useTodoState } from '../TodoContext';
import CheckCircleTemplate from './CheckCircleTemplate';
import CheckSquareTemplate from './CheckSquareTemplate';

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

function TodoItem({ id, done, text, date, checked }) {
    const state = useTodoState();
    return (
        <TodoItemBlock>
            {state.showEditMode ? (
                <>
                    <CheckSquareTemplate props={{ id: id, checked: checked }}></CheckSquareTemplate>
                    <Text $done={done}>
                        <ul className="textList">
                            <li>{text}</li>
                            <li>{date}</li>
                        </ul>
                    </Text>
                </>
            ) : (
                <>
                    <CheckCircleTemplate props={{ id: id, done: done }} />
                    <Text $done={done}>
                        <ul className="textList">
                            <li>{text}</li>
                            <li>{date}</li>
                        </ul>
                    </Text>
                </>
            )}
            {/* <RemoveTemplate props={{ id: id }}></RemoveTemplate> */}
        </TodoItemBlock>
    );
}

export default TodoItem;
