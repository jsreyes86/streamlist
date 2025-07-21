import React, { useState } from 'react';

function MovieItem({ item, onToggleComplete, onDelete, onSaveEdit }) {
    const [editMovieTitle, setEditMovieTitle] = useState(item.title);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onSaveEdit(item.id, editMovieTitle);
        setIsEditing(false);
    };

    return (
 <li key={item.id} className={item.completed ? 'completed' : ''}>
            <div className="movie-card">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editMovieTitle}
                            onChange={(e) => setEditMovieTitle(e.target.value)}
                        />
                        <button onClick={handleSaveClick}>
                            <span className="material-icons">save</span>
                        </button>
                    </>
                ) : (
                    <>
                        <span>{item.title}</span>
                        <button onClick={() => onToggleComplete(item.id)}>
                            <span className="material-icons">
                                {item.completed ? 'undo' : 'check'}
                            </span>
                        </button>
                        <button onClick={handleEditClick}>
                            <span className="material-icons">edit</span>
                        </button>
                        <button onClick={() => onDelete(item.id)}>
                            <span className="material-icons">delete</span>
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default MovieItem;