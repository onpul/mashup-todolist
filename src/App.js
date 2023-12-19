import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';
import CalendarTemplate from './components/CalendarTemplate';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
    return (
        <>
            <TodoProvider>
                <GlobalStyle />
                <CalendarTemplate />
                <TodoTemplate>
                    <TodoHead />
                    <TodoList />
                    <TodoCreate />
                </TodoTemplate>
            </TodoProvider>
        </>
    );
}

export default App;
