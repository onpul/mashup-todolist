import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';
import moment from 'moment';

const TodoListBlock = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px 32px;
    padding-bottom: 48px;
    min-height: 400px;
    max-height: 600px;
    overflow: auto;
`;

function TodoList() {
    const state = useTodoState();
    const todoList = state.todoItem;
    const filteredList = todoList.filter((todo) => moment(todo.date).isBetween(state.minDate, state.maxDate, undefined, '[]'));

    return (
        <TodoListBlock>
            {filteredList &&
                filteredList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.content}
                        date={todo.date}
                        done={todo.completed} // boolean 타입
                    />
                ))}
        </TodoListBlock>
    );
}

export default TodoList;
