import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './components/Layout';
import { Route, Routes } from "react-router-dom"
import Home from './components/Home';
import Header from './components/header/header';
import Trailer from './components/trailer/Trailer';
import ReviewForm from './components/ReviewForm/ReviewForm';
import Reviews from './components/Review/Review';

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/movies');
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const getMovieData = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/movies/${movieId}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              />
            }
          />
          {/* Remove the NotFound route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
