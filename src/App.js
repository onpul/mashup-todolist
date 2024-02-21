import React from 'react';
import { createGlobalStyle } from 'styled-components';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';
import { TodoProvider } from './TodoContext';
import CalendarTemplate from './components/CalendarTemplate';
import HeaderTemplate from './components/HeaderTemplate';
import FilterTemplate from './components/FilterTemplate';
import MainTemplate from './components/MainTemplate';

const GlobalStyle = createGlobalStyle`
  html, body {
    background: #e9ecef;
    font-family: 'campton', 'Apple SD Gothic Neo', 'NanumBarunGothic', '나눔바른고딕', 'Malgun Gothic', '맑은 고딕', 'dotum', 'sans-serif';
  }
`;

function App() {
    return (
        <>
            <TodoProvider>
                <GlobalStyle />
                <MainTemplate>
                    <HeaderTemplate />
                    <FilterTemplate />
                    <CalendarTemplate />
                    <TodoTemplate>
                        <TodoHead />
                        <TodoCreate />
                        <TodoList />
                    </TodoTemplate>
                </MainTemplate>
            </TodoProvider>
        </>
    );
}

export default App;
