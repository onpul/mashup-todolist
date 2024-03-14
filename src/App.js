import React from 'react';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" Component={Main} />
        </Routes>
    );
}

export default App;
