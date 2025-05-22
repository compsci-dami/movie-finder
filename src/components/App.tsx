import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import MovieResults from './MovieResults';

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<FrontPage title="MOVIE" subtitle="Finder" />} />
            <Route path="/results/:query" element={<MovieResults />} />
        </Routes>
    </Router>
);

export default App;