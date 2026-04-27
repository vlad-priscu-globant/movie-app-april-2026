<script setup lang="ts">
import type { SearchResult } from "../types/types.ts";
import { useAuthStore } from "../stores/authStore.ts";
import { useMovieStore } from "../stores/movieStore.ts";

const props = defineProps<{
  movie: SearchResult
  readOnly?: boolean
}>()

const authStore = useAuthStore();
const movieStore = useMovieStore();

async function handleToggle() {
  if (!authStore.isLoggedIn) return;
  await movieStore.toggleFavorite(props.movie);
}
</script>

<template>
  <div class="mt-4 flex flex-col gap-2">
    <div v-if="!authStore.isLoggedIn" class="bg-gray-800/50 p-3 rounded border border-gray-700 flex items-center justify-between shadow-inner">
      <span class="text-xs text-gray-400">Want to save this movie?</span>
      <RouterLink to="/login" class="text-xs font-bold text-red-500 hover:text-red-400 underline">Login to favorite</RouterLink>
    </div>
    
    <div v-else class="flex items-center gap-3">
      <span class="text-sm text-gray-400 font-medium">Favorite:</span>
      <div v-if="movieStore.isMovieFavorite(props.movie.id)" @click.prevent="handleToggle" class="cursor-pointer transform hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">
          <path d="M12 21.23l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.41L12 21.23z"/>
        </svg>
      </div>
      <div v-else @click="handleToggle" class="cursor-pointer transform hover:scale-110 transition-transform text-gray-500 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
    </div>
  </div>
</template>
