import React, { useState } from "react";
import './MovieSearch.css';

const API_KEY = '2f4d991344389ce657f213375206da71';

function MovieSearch() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setMovies(data.results);
            setError('');
        } catch (err) {
            setError('Failed to fetch movies. Please try again.');
            setMovies([]);
        }
    };

    return (
        <div className="movie-search-container">
            <h1>Movie Search</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
            <div className="movie-results">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <h2>{movie.title}</h2>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                />
            )}
                        <p>Release Date: {movie.release_date}</p>
                        <p>Rating: {movie.vote_average}</p>
                        <p>Popularity: {movie.popularity}</p>
                        <p>Language: {movie.original_language}</p>
                        <p>{movie.overview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;