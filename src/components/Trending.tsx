import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

const Trending: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=af1c2b6b6855c49665d0dfcb00db0d3a"
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Failed to fetch trending movies", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/results/${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <> 
      <div className="front-page">
        <img src='img/logo.png' alt='Logo' className='logo' />
      </div>
      <div className="results-header">
        <h2 className="title-query" style={{ color: "white" }}>
          Trending Now...
        </h2>
        <SearchBar
          className="search-results"
          value={search}
          onChange={setSearch}
          onSubmit={handleSearch}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-results">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : undefined
                }
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-title">{movie.title}</div>
              <div className="movie-card-footer">
                <div className="movie-info">
                  <span className="rating">Rating: {movie.vote_average}</span>
                  <span className="movie-year">
                    {movie.release_date?.slice(0, 4)}
                  </span>
                </div>
                <div className="movie-plot-tooltip">
                  {movie.overview || "No description available."}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Trending;