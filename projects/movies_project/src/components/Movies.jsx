import React, { useState,useEffect } from 'react'
import axios from 'axios';
import MovieComp from "./Movie";
import MovieDetailsComp from './MovieDetails';
import { useNavigate } from "react-router-dom";


export const MoviesComp = () => {
    const MOVIES_URL = 'https://api.tvmaze.com/shows';
    const [movies, setMovies] = useState([]);
    const [favorite, setFavorite] = useState(() => {
        const savedFavorites = sessionStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
      });
    const [selectedMovie, setSelectedMovie] = useState(null);
    
    const [text, setText] = useState("");
    const nav = useNavigate()

    useEffect(() => {
        async function getData() {
            const { data: movies } = await axios.get(MOVIES_URL);
      
            setMovies(movies);
          }
          getData();
    }, []);

    // Save favorite movies to sessionStorage whenever the list changes
    useEffect(() => {
        sessionStorage.setItem("favorites", JSON.stringify(favorite));
      }, [favorite]);
    

     // Filter the movies by name
     const searchChange = () => {
        if (text.trim() !== "") {
            const moviesFilter = movies.filter((movie) => movie.name.toLowerCase().includes(text.toLowerCase()));
            return moviesFilter;
        } else {
            return movies;
        }
    };

    // Select a specific movie to see its details
    const selectHandler = (id) => {
        if(selectedMovie!=null){
            if (selectedMovie.id==id){
                setSelectedMovie(null);
                return;
            }
        }
        const selected = movies.find((movie) => movie.id === id);
        setSelectedMovie(selected);
    };

    const myFavoriteMovies =()=>{
        nav("/favorites");
    }
    
    const addMovieToMyFavorite = (movie) => {
        if (!favorite.find(favMovie => favMovie.id === movie.id)) {
          setFavorite([...favorite, movie]);
        }
      };
    
      const deleteMovieFromMyFavorite = (movie) => {
        setFavorite(favorite.filter(favMovie => favMovie.id !== movie.id));
      };
    
    
/* const searchChange = async () => {
     if (text.trim() !== "") {
       const response = await fetch(`https://api.tvmaze.com/search/shows?q=${text}`);
       const result = await response.json();
       setMovies(result.map((item) => item.show)); // Set the movies from the API response
     } else {
       // Handle case where text is empty
       setMovies([]); // Optionally, you could show all movies or clear the results
     }
   };

   Which is Better?
 For smaller datasets or situations where you want to avoid making repeated API requests,
your approach of client-side filtering is fine.
For larger datasets or when you want to ensure that you are always getting the latest data from the server, 
the server-side filtering (using the API with the search query) is the better approach.
*/
    
  return (
    <div style={{display: "flex"}}>
        <div>
            <h1>Movies</h1>
            <button onClick={myFavoriteMovies}>My Favorite</button><br/>
            Search Movie: <input type="text" onChange={(e) => setText(e.target.value)} />
            {
                searchChange().map((movie) => {
                const isFavorited = favorite.some((favMovie) => favMovie.id === movie.id); 
                return (
                    <MovieComp
                    key={movie.id}
                    movieData={movie}
                    onSelect={selectHandler}
                    isFavorited={isFavorited} 
                    addFavorite={addMovieToMyFavorite}
                    removeFavorite={deleteMovieFromMyFavorite}
                    />
                );
            })}

        </div>
        <div>
            {/* Display the MovieDetailsComp on the side */}
            {
              selectedMovie &&  <MovieDetailsComp  movie={selectedMovie}/> 
            }
        </div>
    </div>
  )
}
export default MoviesComp
