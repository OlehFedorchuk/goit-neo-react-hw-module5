import { useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
const HomePage = ({ listMovies }) => {
  const location = useLocation();
  return <MovieList list={listMovies} state={location} />;
};
export default HomePage;
