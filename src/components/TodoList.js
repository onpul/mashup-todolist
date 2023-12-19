import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState, useTodoDate } from '../TodoContext';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList() {
    const state = useTodoState();
    const todoList = state.todoItem;
    console.log('>>> todoList : ' + JSON.stringify(todoList) + ' <<<');

    const todoDate = useTodoDate();
    console.log('>>> todoDate : ' + todoDate.current + ' <<<');

    const filteredList = todoList.filter(
        (todo) => todo.date === todoDate.current
    );
    console.log('>>> filteredList : ' + JSON.stringify(filteredList) + ' <<<');
    return (
        <TodoListBlock>
            {filteredList &&
                filteredList.map((todo) => (
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
