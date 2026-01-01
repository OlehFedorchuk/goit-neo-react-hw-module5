import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../apiService/tmdb";

const MovieReviews = () => {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch {
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>No reviews</p>;

  return (
    <ul>
      {reviews.map((r) => (
        <li key={r.id}>
          <h4>Author: {r.author}</h4>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
