const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTllMDAxZjNmOTMyZDM1M2MyOWZhZmE2NGY2OWY3ZSIsIm5iZiI6MTY5MjQ1Mjg1My42MTUsInN1YiI6IjY0ZTBjN2Y1MzcxMDk3MDBmZmJhNDhkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vxs_1mLXs9BM7LXEmDxf9etWYgiI0TLgZLA0obkGI60";
import axios from "axios";

export const IMG_500 = "https://image.tmdb.org/t/p/w500";
export const IMG_200 = "https://image.tmdb.org/t/p/w200";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getTrendingMovies = async (language = "en-US", page = 1) => {
  const res = await api.get("trending/movie/day", {
    params: { language, page },
  });
  return res.data.results;
};

export const searchMovies = async (query, language = "en-US", page = 1) => {
  const res = await api.get("search/movie", {
    params: { query, language, page, include_adult: false },
  });
  return res.data.results;
};

export const getMovieDetails = async (movieId, language = "en-US") => {
  const res = await api.get(`movie/${movieId}`, { params: { language } });
  return res.data;
};

export const getMovieCredits = async (movieId, language = "en-US") => {
  const res = await api.get(`movie/${movieId}/credits`, {
    params: { language },
  });
  return res.data.cast;
};

export const getMovieReviews = async (
  movieId,
  language = "en-US",
  page = 1
) => {
  const res = await api.get(`movie/${movieId}/reviews`, {
    params: { language, page },
  });
  return res.data.results;
};
