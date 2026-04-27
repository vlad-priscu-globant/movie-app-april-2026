import { httpWrapper } from "./httpWrapper";

const apiKey = import.meta.env.VITE_API_URL;
const baseUrl = import.meta.env.VITE_BASE_URL;

const fetchHeaders = {
  headers: {
    Authorization: 'Bearer ' + apiKey
  },
}

export async function fetchPopularMovies(page: number) {
  return await httpWrapper(`${baseUrl}/movie/popular?page=${page}`, fetchHeaders)
}

export async function fetchMovieById(movie_id: number) {
  return await httpWrapper(`${baseUrl}/movie/${movie_id}`, fetchHeaders)
}

export async function searchMovie(query: string) {
  return await httpWrapper(`${baseUrl}/search/movie?query=${query}&language=en-US&page=1`, fetchHeaders)
}