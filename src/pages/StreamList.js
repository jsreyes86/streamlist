import React, { useState, useEffect } from 'react';
import MovieItem from '../components/MovieItem';
import './StreamList.css';


function StreamList() {
    const [movie, setMovie] = useState('');
    const [movieList, setMovieList] = useState([]);

useEffect(() => {
    const storedMovies = localStorage.getItem('movieList');
    if (storedMovies) {
        setMovieList(JSON.parse(storedMovies));
    }
}, []);

    useEffect(() => {
            localStorage.setItem('movieList', JSON.stringify(movieList));
    }, [movieList]);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movie.trim() === '') return;

        const newMovie = {
            id: Date.now(),
            title: movie,
            completed: false,
        };

            setMovieList([...movieList, newMovie]);
            setMovie('');
        };

        const handleDelete = (id) => {
            setMovieList(movieList.filter(item => item.id !== id));
        };

        const handleToggleComplete = (id) => {
            const updatedList = movieList.map(item => 
                item.id === id ? { ...item, completed: !item.completed } : item
            );
            setMovieList(updatedList);
        };

    const handleSaveEdit = (id, newTitle) => {
        const updatedList = movieList.map(item => 
            item.id === id ? { ...item, title: newTitle } : item
        );
        setMovieList(updatedList);
    };

    return (
        <div className="streamlist-container">
            <h1>Stream List</h1>
            <form onSubmit={handleSubmit} className="movie-form">
                <input
                    type="text"
                    value={movie}
                    onChange={(e) => setMovie(e.target.value)}
                    placeholder="Movie Title"
                />

            <button type="submit">Submit</button>

            </form>
            <ul className="movie-list">
                {movieList.map((item) => (
                    <MovieItem
                        key={item.id}
                        item={item}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDelete}
                        onSaveEdit={handleSaveEdit}
                    />
                ))}
            </ul>
        </div>
    );
}

export default StreamList;