import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../apiService/tmbd";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setError("Failed to load trending movies");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
