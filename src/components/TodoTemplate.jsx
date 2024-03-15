import React from 'react';
import styled from 'styled-components';
import TodoHead from './TodoHead';
import TodoEdit from './TodoEdit';
import TodoList from './TodoList';

const TodoTemplateBlock = styled.div`
    height: 100%;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    padding: 0 30px;
    display: flex;
    flex-direction: column;
`;

function TodoTemplate({ children }) {
    return (
        <TodoTemplateBlock>
            <TodoHead />
            <TodoEdit />
            <TodoList />
        </TodoTemplateBlock>
    );
}

export default TodoTemplate;
