import { useOutletContext } from "react-router-dom";

const MovieCast = () => {
  const { movie } = useOutletContext();
  const IMG_BASE = "https://image.tmdb.org/t/p/w200";
  return (
    <>
      <h3>Production Companies</h3>

      <ul>
        {movie?.production_companies?.map((company) => (
          <li key={company.id}>
            <p>{company.name}</p>

            {company.logo_path && (
              <img
                src={`${IMG_BASE}${company.logo_path}`}
                alt={company.name}
                style={{ maxWidth: "120px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieCast;
