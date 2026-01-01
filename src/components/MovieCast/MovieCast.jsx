import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, IMG_200 } from "../../apiService/tmdb";
import noPhoto from "../../assets/no-photo.png";
const MovieCast = () => {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch {
        setError("Failed to load cast");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No cast information</p>;

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.credit_id}>
          <img
            width="120"
            src={
              actor.profile_path ? `${IMG_200}${actor.profile_path}` : noPhoto
            }
            alt={actor.name}
          />
          <p>
            <b>{actor.name}</b>
          </p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
