import { useEffect, useState } from "react";
import { getMovies, getMoviesSearch } from "./apiService/movie";
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import MovieCast from "./components/MovieCast/MovieCast";
import MoviesReviews from "./components/MovieReviews/MoviesReviews";
import Navigation from "./components/Navigation/Navigation";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const axiosMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        setError("Failed to load movies");
        console.error(err);
      }
    };

    axiosMovies();
  }, []);
  if (error) return <p>{error}</p>;

  const handleSub = async (searchQuery) => {
    console.log("searchQuery", searchQuery);
    const result = await getMoviesSearch(searchQuery, 1);
    console.log("result is:", result);
    setSearch(result);
  };

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage listMovies={movies} />} />
        <Route
          path="/movies"
          element={<MoviesPage onSubmit={handleSub} listMovies={search} />}
        />

        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MoviesReviews />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
