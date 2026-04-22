<script setup lang="ts">
import type { SearchResult } from "../types/types.ts";
import { onMounted, ref, watch } from "vue";
import { addWatchList, fetchWatchListItem, removeFromWatchList } from "../api/localDb.ts";
import { useAuthStore } from "../stores/authStore.ts";

const props = defineProps<{
  movie: Partial<SearchResult>
  readOnly?: boolean
}>()

const authStore = useAuthStore();
const localItem = ref<Partial<SearchResult>>({ id: 0 })
const error = ref<string | null>(null)

async function checkFavoriteStatus() {
  if (!props.readOnly && authStore.isLoggedIn) {
    try {
      const item = await fetchWatchListItem(Number(props.movie.id));
      localItem.value = item;
      error.value = null;
    } catch (err: any) {
      if (err.message !== 'Unauthorized') {
         console.error('Failed to fetch favorite status', err)
      }
      localItem.value = { id: 0 };
    }
  } else {
    localItem.value = { id: 0 };
  }
}

onMounted(checkFavoriteStatus)

// Refresh status if login/logout happens while on page
watch(() => authStore.isLoggedIn, (newVal) => {
  if (newVal) checkFavoriteStatus();
  else localItem.value = { id: 0 };
})

async function handleAddToFavorite(item: number | null | undefined) {
  if (!authStore.isLoggedIn) return;
  if (item) {
    try {
      await addWatchList(props.movie)
      localItem.value.id = item
      error.value = null
    } catch (err) {
      error.value = "Failed to add favorite."
    }
  }
}

async function handleremoveFromFavorite(item: number | null | undefined) {
  if (item) {
    try {
      await removeFromWatchList(props.movie)
      localItem.value.id = 0
      error.value = null
    } catch (err) {
      error.value = "Failed to remove favorite."
    }
  }
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
      <div v-if="props.movie.id == localItem?.id" @click.prevent="handleremoveFromFavorite(props.movie.id)" class="cursor-pointer transform hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="filter drop-shadow-[0_0_5px_rgba(255,0,0,0.5)]">
          <path d="M12 21.23l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.41L12 21.23z"/>
        </svg>
      </div>
      <div v-else @click="handleAddToFavorite(props.movie.id)" class="cursor-pointer transform hover:scale-110 transition-transform text-gray-500 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
