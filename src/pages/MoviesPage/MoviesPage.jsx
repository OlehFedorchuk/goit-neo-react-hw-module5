import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../apiService/tmdb";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const fetchByQuery = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await searchMovies(query);
        setMovies(data);
      } catch {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchByQuery();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.elements.search.value.trim();
    if (!value) return;

    setSearchParams({ query: value });
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          name="search"
          autoComplete="off"
          placeholder="Search films"
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {movies.length > 0 && <MovieList movies={movies} />}
      {!loading && query && movies.length === 0 && <p>No movies found</p>}
    </main>
  );
};

export default MoviesPage;
