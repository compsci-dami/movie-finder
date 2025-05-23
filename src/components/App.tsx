
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './FrontPage';
import MovieResults from './MovieResults';
import Trending from './Trending';

const App: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<FrontPage title="MOVIE" subtitle="Finder" />} />
            <Route path="/results/:query" element={<MovieResults />} />
            <Route path="/trending" element={<Trending />} />
        </Routes>
    </Router>
);

export default App;