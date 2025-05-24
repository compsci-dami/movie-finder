
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MovieResults from './MovieResults';
import Trending from './Trending';

const App: React.FC = () => (
    <Router basename="/movie-finder">
        <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/results/:query" element={<MovieResults />} />
        </Routes>
    </Router>
);

export default App;