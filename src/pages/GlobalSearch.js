import React, { useState } from "react";
import ezTechData from '../data/Data';
import './GlobalSearch.css';

const API_KEY = '2f4d991344389ce657f213375206da71';

function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filteredEZTech, setFilteredEZTech] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Local EZTech search
    const localResults = ezTechData.filter(item =>
      item.service.toLowerCase().includes(query.toLowerCase()) ||
      item.serviceInfo.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEZTech(localResults);

    // TMDB API search
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setMovies(data.results || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch movie results. Please try again.');
      setMovies([]);
    }
  };

  return (
    <div className="global-search-container">
      <h1>Search</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subscriptions or movies..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="results-wrapper">
        {filteredEZTech.length > 0 && (
          <>
            <h3 className="section-title">EZTech Results</h3>
            {filteredEZTech.map(item => (
              <div key={item.id} className="result-card">
                <h4>{item.service}</h4>
                <img src={item.img} alt={item.service} />
                <p>{item.serviceInfo}</p>
                <p>${item.price.toFixed(2)}</p>
              </div>
            ))}
          </>
        )}

        {movies.length > 0 && (
          <>
            <h3 className="section-title">Movie Results</h3>
            {movies.filter(item => item.media_type !== 'person').map(item => (
              <div key={item.id} className="result-card">
                <h4>{item.title || item.name}</h4>
                {item.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                  />
                )}
                <p>Type: {item.media_type}</p>
                {item.release_date && <p>Release Date: {item.release_date}</p>}
                {item.vote_average && <p>Rating: {item.vote_average}</p>}
                <p>{(item.overview || item.biography)?.slice(0, 120)}...</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default GlobalSearch;
