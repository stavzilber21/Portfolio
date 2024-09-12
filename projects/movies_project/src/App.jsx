import { MoviesComp } from './components/Movies'
import { Routes, Route } from 'react-router-dom';
import FavoriteMoviesComp from './components/FavoriteMovies';

function App() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' , "float":"left"}}>
          <Routes>
            {/* Movies component on the left */}
            <Route path="/" element={<MoviesComp />} />
          </Routes>
        </div>

        <div style={{ width: '50%', "float":"right" }}>
          <Routes>
            {/* Favorite movies component on the right */}
            <Route path="/favorites" element={<FavoriteMoviesComp />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
