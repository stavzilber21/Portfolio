import React, { useState, useEffect } from 'react';

export const MovieComp = ({ movieData, onSelect, addFavorite, removeFavorite, isFavorited }) => {
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  useEffect(() => {
    setIsFavorite(isFavorited);  // עדכון סטטוס הסרט במועדפים כשהעמוד רענן או אחרי חזרה
  }, [isFavorited]);

  const selectMovie = (id) => {
    onSelect(id);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movieData);
    } else {
      addFavorite(movieData);
    }
    setIsFavorite(!isFavorite); // שינוי המצב של הלב
  };

  return (
    <div style={{ width: '200px', border: 'solid 2px pink', margin: '5px', padding: '10px' }}>
      <div onClick={() => selectMovie(movieData.id)}>{movieData.name}</div>
      <button 
        onClick={toggleFavorite} 
        style={{
          border: 'none', 
          background: 'none', 
          cursor: 'pointer', 
          fontSize: '20px', 
          color: isFavorite ? 'red' : 'grey'
        }}
      >
        {isFavorite ? '♥' : '♡'}  {/* שינוי הלב בהתאם לסטטוס */}
      </button>
    </div>
  );
};

export default MovieComp;
