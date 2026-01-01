import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails, IMG_500 } from "../../apiService/tmdb";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <main>
      <Link to={backLinkRef.current} className={css.backBtn}>
        Go back
      </Link>

      <div>
        <img
          width="300"
          src={
            movie.poster_path
              ? `${IMG_500}${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.title}
        />

        <h2>{movie.title}</h2>
        <p>User score: {Math.round(movie.vote_average * 10)}%</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>

        <h3>Genres</h3>
        <p>{movie.genres?.map((g) => g.name).join(", ")}</p>
      </div>

      <hr />

      <h3>Additional information</h3>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Outlet />
    </main>
  );
};

export default MovieDetailsPage;
