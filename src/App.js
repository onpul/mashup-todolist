import React from 'react';
import MainTemplate from './components/MainTemplate';
import { TodoProvider, ComponentProvider } from './TodoContext';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <ComponentProvider>
            <TodoProvider>
                <Routes>
                    <Route path="/mashup-todolist" Component={MainTemplate} />
                </Routes>
            </TodoProvider>
        </ComponentProvider>
    );
}

export default App;
