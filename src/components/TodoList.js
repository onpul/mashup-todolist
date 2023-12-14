import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList() {
    const todoList = useTodoState();
    console.log(todoList);

    return (
        <TodoListBlock>
            {todoList &&
                todoList.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.content}
                        done={todo.completed} // boolean 타입
                    />
                ))}
        </TodoListBlock>
    );
}

export default TodoList;
