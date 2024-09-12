import React, { useEffect, useState } from 'react';

const FavoriteMoviesComp = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = sessionStorage.getItem("favorites");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites)); // המרת המחרוזת למערך
        }
    }, []);

    return (
        <div>
            <h1>My Favorite Movies</h1>
            {favorites.length > 0 ? (
                favorites.map((movie) => <div key={movie.id}>{movie.name}</div>)
            ) : (
                <p>No favorite movies found.</p>
            )}
        </div>
    );
};

export default FavoriteMoviesComp;
