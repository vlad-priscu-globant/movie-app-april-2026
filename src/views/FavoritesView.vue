<script setup lang="ts">
import { onMounted } from 'vue';
import { useMovieStore } from '../stores/movieStore';
import MovieCard from '../components/MovieCard.vue';

const movieStore = useMovieStore();

onMounted(() => {
    movieStore.fetchFavorites();
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Your Favorite Movies</h1>
    
    <div v-if="movieStore.favorites.length === 0" class="text-gray-400">
      You haven't added any favorites yet.
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <MovieCard v-for="movie in movieStore.favorites" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>
