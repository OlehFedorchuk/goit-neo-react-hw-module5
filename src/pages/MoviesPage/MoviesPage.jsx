import MovieList from "../../components/MovieList/MovieList";
import { useLocation, useSearchParams } from "react-router-dom";
const MoviesPage = ({ onSubmit, listMovies }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("query") ?? "";
  console.log("queryFromUrl", queryFromUrl);
  const handleSubmit = (event) => {
    event.preventDefault();
    const value = event.target.elements.search.value.trim();
    console.log("Value", value);
    if (!value) {
      console.log("Error: films not found. Try again.");
      return;
    }
    setSearchParams({ query: value });
    onSubmit(value);
  };
  return (
    <>
      <p>page/MoviesPage</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList list={listMovies} state={location} />
    </>
  );
};
export default MoviesPage;
