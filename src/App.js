import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';
import Users from './Users';

// import logo from './logo.svg';
// import './App.css';

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
    return (
        <Users />
        // <TodoProvider>
        //     <GlobalStyle />
        //     <TodoTemplate>
        //         <TodoHead />
        //         <TodoList />
        //         <TodoCreate />
        //     </TodoTemplate>
        // </TodoProvider>
    );
}

export default App;
