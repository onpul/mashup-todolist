import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
import Profile from './Profile';

const App = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/about">ABOUT</Link>
                </li>
            </ul>
            <hr />
            <Routes>
                <Route path="/" exact={true} element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="/profiles/:username"
                    element={<Profile animate={true} />}
                />
            </Routes>
        </div>
    );
};

export default App;
