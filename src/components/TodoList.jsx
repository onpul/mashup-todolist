import React from 'react';
import { styled, css } from 'styled-components';
import { useTodoState } from '../TodoContext';
import TodoItem from './TodoItem';
import moment from 'moment';

const TodoListBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 32px;
    /* max-height: 600px; */
    overflow: auto;
    ${(props) =>
        props.$margin &&
        css`
            min-height: 400px;
            padding-bottom: 48px;
        `}
`;

function TodoList({ list }) {
    const state = useTodoState();
    const todoList = state.todoItem;
    const filteredList = list ? list : todoList.filter((todo) => moment(todo.date).isBetween(state.minDate, state.maxDate, undefined, '[]'));

    return (
        <TodoListBlock $margin={list ? false : true}>
            {filteredList &&
                filteredList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.content}
                        date={todo.date}
                        done={todo.completed} // boolean 타입
                        checked={todo.checked}
                    />
                ))}
        </TodoListBlock>
    );
}

export default TodoList;
