import React from 'react';
import Main from './components/Main';
import { TodoProvider, ComponentProvider } from './TodoContext';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <ComponentProvider>
            <TodoProvider>
                <Routes>
                    <Route path="/" Component={Main} />
                </Routes>
            </TodoProvider>
        </ComponentProvider>
    );
}

export default App;
