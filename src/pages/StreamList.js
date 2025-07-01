import React, { useState } from 'react';
import './StreamList.css';

function StreamList() {
    const [movie, setMovie] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editMovie, setEditMovie] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movie.trim() === '') return;

        const newMovie = {
            title: movie,
            completed: false,
        };

            setMovieList([...movieList, newMovie]);
            setMovie('');
        };

        const handleDelete = (index) => {
        const updatedList = [...movieList];
        updatedList.splice(index, 1);
        setMovieList(updatedList);
        };

        const handleToggleComplete = (index) => {
        const updatedList = [...movieList];
        updatedList[index].completed = !updatedList[index].completed;
        setMovieList(updatedList);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditMovie(movieList[index].title);
    };

    const handleSaveEdit = () => {
        const updatedList = [...movieList];
        updatedList[editIndex].title = editMovie;
        setMovieList(updatedList);
        setEditIndex(null);
        setEditMovie('');
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
                {movieList.map((item, index) => (
                    <li key={index} className={item.completed ? 'completed' : ''}>
                        {editIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editMovie}
                                    onChange={(e) => setEditMovie(e.target.value)}
                                    />
                                <button onClick={handleSaveEdit}>
                                    <span className="material-icons">save</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <span>{item.title}</span>
                                <button onClick={() => handleToggleComplete(index)}>
                                    <span className="material-icons">
                                        {item.completed ? 'undo' : 'check'}
                                    </span>
                                </button>
                                <button onClick={() => handleEdit(index)}>
                                    <span className="material-icons">edit</span>
                                </button>
                                <button onClick={() => handleDelete(index)}>
                                    <span className="material-icons">delete</span>
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            </div>
    );
}

export default StreamList;