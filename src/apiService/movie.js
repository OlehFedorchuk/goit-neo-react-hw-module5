import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTllMDAxZjNmOTMyZDM1M2MyOWZhZmE2NGY2OWY3ZSIsIm5iZiI6MTY5MjQ1Mjg1My42MTUsInN1YiI6IjY0ZTBjN2Y1MzcxMDk3MDBmZmJhNDhkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Vxs_1mLXs9BM7LXEmDxf9etWYgiI0TLgZLA0obkGI60";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`, // без пробілу в кінці
  },
});

export const getMovies = async (language = "en-US", page = 1) => {
  const response = await api.get("movie/popular", {
    params: { language, page },
  });
  return response.data.results; // масив
};

export const getMovieById = async (movieId, language = "en-US") => {
  const response = await api.get(`movie/${movieId}`, {
    params: { language },
  });
  return response.data; // один обʼєкт
};
export const getMoviesSearch = async (query, page = 1) => {
  const response = await api.get("search/movie", {
    params: { query, page },
  });
  return response.data.results; // масив
};
