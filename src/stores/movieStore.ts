import { ref } from "vue";
import { defineStore } from 'pinia'
import type { SearchResult } from "../types/types.ts";
import { fetchMovieById, searchMovie } from "../api/tmdb.ts";
import { addWatchList, fetchWatchList, removeFromWatchList } from "../api/localDb.ts";

export const useMovieStore = defineStore('movieStore', () => {
  const movieCache = ref<Record<any, SearchResult>>({})
  const searchList = ref<Record<any, SearchResult>>({})
  const searchQuery = ref<string>("")
  const favorites = ref<SearchResult[]>([])

  async function fetchMovie(id: number): Promise<SearchResult> {
    if (movieCache.value[id]) {
      return movieCache.value[id];
    }
    const data = await fetchMovieById(id);
    movieCache.value[id] = data || {}
    return data
  }

  async function searchMovieList(query: string): Promise<SearchResult> {
    searchQuery.value = query;
    const data = await searchMovie(query);
    searchList.value = data;
    return data;
  }

  async function fetchFavorites() {
    try {
      favorites.value = await fetchWatchList();
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    }
  }

  async function toggleFavorite(movie: SearchResult) {
    const isFavorite = favorites.value.some(m => m.id === movie.id);
    try {
      if (isFavorite) {
        await removeFromWatchList(movie);
        favorites.value = favorites.value.filter(m => m.id !== movie.id);
      } else {
        await addWatchList(movie);
        favorites.value.push(movie);
      }
    } catch (err) {
      console.error("Toggle favorite failed", err);
    }
  }

  function isMovieFavorite(id: number) {
    return favorites.value.some(m => m.id === id);
  }

  return {
    movieCache, 
    fetchMovie, 
    searchList, 
    searchMovieList, 
    searchQuery, 
    favorites, 
    fetchFavorites, 
    toggleFavorite,
    isMovieFavorite
  }
})