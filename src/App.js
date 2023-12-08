import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
};

export default App;
