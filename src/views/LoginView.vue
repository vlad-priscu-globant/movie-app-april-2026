<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
const error = ref<string | null>(null);

async function handleLogin() {
  isLoading.value = true;
  error.value = null;
  try {
    await authStore.login();
    // Redirect back to home or previous page
    router.push('/');
  } catch (err: any) {
    error.value = "Login failed. Please try again.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-800">
      <h2 class="text-3xl font-bold text-center mb-6 text-red-600">Login</h2>
      <p class="text-gray-400 text-center mb-8">
        Unlock premium features like keeping a personal favorite list!
      </p>
      
      <div v-if="error" class="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm text-center">
        {{ error }}
      </div>
      
      <button 
        @click="handleLogin" 
        :disabled="isLoading"
        class="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-3 rounded transition-colors duration-200 shadow-lg"
      >
        <span v-if="isLoading">Logging in...</span>
        <span v-else>Fake Login (Student Demo)</span>
      </button>
      
      <p class="mt-6 text-xs text-center text-gray-500 italic">
        * This is a demo. No real password is required. Just click to receive a signed JWT from the server.
      </p>
    </div>
  </div>
</template>
