import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    rating?: string;
    Plot?:string;
}

const MovieResults: React.FC = () => {
    const { query } = useParams<{ query: string }>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;
        setLoading(true);
        fetch(`https://www.omdbapi.com/?apikey=7a60f718&s=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(async data => {
                const searchResults = data.Search || [];
                // Fetch ratings for each movie
                const moviesWithRatings = await Promise.all(
                    searchResults.map(async (movie: Movie) => {
                        const res = await fetch(`https://www.omdbapi.com/?apikey=7a60f718&i=${movie.imdbID}`);
                        const details = await res.json();
                        return { ...movie, rating: details.imdbRating, Plot: details.Plot};
                    })
                );
                setMovies(moviesWithRatings);
                setLoading(false);
            });
    }, [query]);

    return (
        <div>
            <h2 className="title-query" style={{ color: "white" }}>Results for "{query}"</h2>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : (
                <div className="movie-results">
                    {movies.length === 0 && <p className="no-results">No results found</p>}
                    {movies.map(movie => (
                        <div key={movie.imdbID} className="movie-card">
                            <img src={movie.Poster !== "N/A" ? movie.Poster : undefined} alt={movie.Title} className="movie-poster" />
                            <div className="movie-title">{movie.Title}</div>
                            <div className="movie-card-footer">
                                <div className="movie-info"> 
                                    <span className="rating">Rating: {movie.rating || "N/A"}</span>
                                    <span className="movie-year">{movie.Year}</span>
                                </div>
                                <div className="movie-plot-tooltip">{movie.Plot}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieResults;