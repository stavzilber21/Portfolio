// Action Types
export const FETCH_POPULAR_MOVIES = "FETCH_POPULAR_MOVIES";
export const FETCH_NOW_PLAYING_MOVIES = "FETCH_NOW_PLAYING_MOVIES";
export const SET_POPULAR_MOVIES = "SET_POPULAR_MOVIES";
export const SET_NOW_PLAYING_MOVIES = "SET_NOW_PLAYING_MOVIES";
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const SET_ERROR = "SET_ERROR";


export const fetchPopularMovies = (page) => ({
  type: FETCH_POPULAR_MOVIES,
  payload: page, 
});


export const fetchNowPlayingMovies = (page) => ({
  type: FETCH_NOW_PLAYING_MOVIES,
  payload: page, 
});


export const setPopularMovies = (movies) => ({
  type: SET_POPULAR_MOVIES,
  payload: movies,
});

export const setNowPlayingMovies = (movies) => ({
  type: SET_NOW_PLAYING_MOVIES,
  payload: movies,
});

export const addToFavorites = (movie) => ({
  type: ADD_TO_FAVORITES,
  payload: movie,
});

export const removeFromFavorites = (movie) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: movie,
});

export const setError = (message) => ({
  type: SET_ERROR,
  payload: message,
});


