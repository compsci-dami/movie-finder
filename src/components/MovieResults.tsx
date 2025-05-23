import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    rating?: string;
    Plot?: string;
}

const MovieResults: React.FC = () => {
    const { query } = useParams<{ query: string }>();
    const [search, setSearch] = useState(query || "");
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!query) return;

        const fetchMovies = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=7a60f718&s=${encodeURIComponent(query)}`
                );
                const data = await res.json();
                const searchResults = data.Search || [];

                const moviesWithDetails = await Promise.all(
                    searchResults.map(async (movie: Movie) => {
                        const detailRes = await fetch(
                            `https://www.omdbapi.com/?apikey=7a60f718&i=${movie.imdbID}`
                        );
                        const details = await detailRes.json();
                        return {
                            ...movie,
                            rating: details.imdbRating,
                            Plot: details.Plot,
                        };
                    })
                );

                setMovies(moviesWithDetails);
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query]);

    const handleSearch = () => {
        if (search.trim()) {
            navigate(`/results/${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <>
            <div className="results-header">
                <h2 className="title-query" style={{ color: "white" }}>
                    Results for {query}
                </h2>
                <SearchBar
                    className="search-results"
                    value={search}
                    onChange={setSearch}
                    onSubmit={handleSearch}
                />
            </div>

            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : (
                <div className="movie-results">
                    {movies.length === 0 ? (
                        <p className="no-results">No results found</p>
                    ) : (
                        movies.map((movie) => (
                            <div key={movie.imdbID} className="movie-card">
                                <img
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : undefined
                                    }
                                    alt={movie.Title}
                                    className="movie-poster"
                                />
                                <div className="movie-title">{movie.Title}</div>
                                <div className="movie-card-footer">
                                    <div className="movie-info">
                                        <span className="rating">
                                            Rating: {movie.rating || "N/A"}
                                        </span>
                                        <span className="movie-year">
                                            {movie.Year}
                                        </span>
                                    </div>
                                    <div className="movie-plot-tooltip">
                                        {movie.Plot || "No description available."}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </>
    );
};

export default MovieResults;