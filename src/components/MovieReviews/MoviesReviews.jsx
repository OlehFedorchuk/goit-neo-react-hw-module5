import { useOutletContext } from "react-router-dom";

const MoviesReviews = () => {
  const { movie } = useOutletContext();
  return (
    <>
      MoviesReviews
      <p>{movie.overview}</p>
    </>
  );
};
export default MoviesReviews;
