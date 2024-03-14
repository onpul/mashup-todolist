import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
    height: 100%;
    min-width: 1em;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    margin: 10px 20px 10px;
    display: flex;
    flex-direction: column;
`;

function TodoTemplate({ children }) {
    return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;
