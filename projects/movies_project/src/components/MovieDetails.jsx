import React from 'react'

export const MovieDetailsComp = ({movie}) => {
  return (
    <div style={{ padding: "15px", border: "2px solid gray", margin: "25px" }}>
    <h2>{movie.name}</h2>
    <img src={movie.image.medium} alt={movie.name} />
    <p><strong>Language:</strong> {movie.language}</p>
    <p><strong>Genres:</strong> {movie.genres.join(", ")}</p>
    <p><strong>Premiered:</strong> {movie.premiered}</p>
    <p><strong>Rating:</strong> {movie.rating.average || "N/A"}</p>
    <p><strong>Summary:</strong> {movie.summary ? movie.summary.replace(/(<([^>]+)>)/gi, "") : "No summary available."}</p>
  </div>
  )
}
export default MovieDetailsComp 
