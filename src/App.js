import React from 'react';
import Main from './components/Main';
import { TodoProvider } from './TodoContext';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <TodoProvider>
            <Routes>
                <Route path="/" Component={Main} />
            </Routes>
        </TodoProvider>
    );
}

export default App;
