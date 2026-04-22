<script lang="ts" setup>
import Search from "./components/Search.vue";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-black text-white font-sans">
    <header class="flex justify-between items-center p-4 bg-gradient-to-b from-black via-gray-900 to-transparent sticky top-0 z-50">
      <RouterLink to="/"><h1 class="text-3xl font-bold text-red-600">MovieApp</h1></RouterLink>
      <nav class="flex gap-6 items-center">
        <Search></Search>
        <template v-if="!authStore.isLoggedIn">
          <RouterLink to="/login" class="text-sm bg-red-600 px-4 py-1 rounded hover:bg-red-700">Login</RouterLink>
        </template>
        <template v-else>
          <button class="text-sm border border-gray-600 px-4 py-1 rounded hover:bg-gray-800" @click="authStore.logout">Logout</button>
        </template>
      </nav>
    </header>
    <main class="p-4">
      <RouterView/>
    </main>

    <footer class="text-center text-gray-500 text-sm p-4 border-t border-gray-700">
      ┬⌐ 2025 MovieApp.
    </footer>
  </div>
</template>

<style scoped>

</style>
