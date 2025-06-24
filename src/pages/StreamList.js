import React, { useState } from 'react';

function StreamList() {
    const [movie, setMovie] = useState('');

    const handleSubmimt = (e) => {
        e.preventDefault();
        console.log(`Movie added: ${movie}`);
        setMovie('');
    };

    return (
         <div className="streamlist-container">
            <h1>Stream List</h1>
            <form onSubmit={handleSubmimt}>
                <input
                    type="text"
                    value={movie}
                    onChange={(e) => setMovie(e.target.value)}
                    placeholder="Add a movie"
                />
                <button type="submit">Add Movie</button>
            </form>
            </div>
    );
}

export default StreamList;