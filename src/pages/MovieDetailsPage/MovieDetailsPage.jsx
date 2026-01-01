import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getMovieById } from "../../apiService/movie";

const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (err) {
        console.log("err", err.response?.status, err.response?.data);
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;
  const IMG_BASE = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <Link to={backLinkRef.current}>Go back</Link>
      <img
        src={
          movie.backdrop_path
            ? `${IMG_BASE}${movie.backdrop_path}`
            : "https://via.placeholder.com/500x281?text=No+Image"
        }
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet context={{ movie }} />
    </>
  );
};

export default MovieDetailsPage;
