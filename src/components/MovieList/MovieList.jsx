import { Link } from "react-router-dom";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ list, state }) => {
  return (
    <ul>
      {list.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: state }}>
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
