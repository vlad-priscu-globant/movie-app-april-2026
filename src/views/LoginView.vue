<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { z } from 'zod';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);
const serverError = ref<string | null>(null);

const form = ref({
  username: '',
  password: ''
});

const errors = ref<{ username?: string; password?: string }>({});

// Zod Schema for Login
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

async function handleLogin() {
  const result = loginSchema.safeParse(form.value);
  
  if (!result.success) {
    // Extract Zod errors
    errors.value = result.error.flatten().fieldErrors as any;
    // Map array errors to single strings for simplicity in this session
    Object.keys(errors.value).forEach(key => {
        const k = key as keyof typeof errors.value;
        if (Array.isArray(errors.value[k])) {
            errors.value[k] = (errors.value[k] as any)[0];
        }
    });
    return;
  }

  // Clear previous errors
  errors.value = {};
  serverError.value = null;
  isLoading.value = true;
  
  try {
    await authStore.login(form.value);
    router.push('/');
  } catch (err: any) {
    serverError.value = "Login failed. Please check your credentials.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh]">
    <div class="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-800">
      <h2 class="text-3xl font-bold text-center mb-6 text-red-600">Login</h2>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Username</label>
          <input 
            v-model="form.username" 
            type="text" 
            placeholder="student"
            :class="[
              'w-full bg-gray-800 border rounded p-2 text-white focus:outline-none focus:border-red-500 transition-colors',
              errors.username ? 'border-red-500' : 'border-gray-700'
            ]"
          />
          <p v-if="errors.username" class="text-xs text-red-500 mt-1">{{ errors.username }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-400 mb-1">Password</label>
          <input 
            v-model="form.password" 
            type="password" 
            placeholder="password123"
            :class="[
              'w-full bg-gray-800 border rounded p-2 text-white focus:outline-none focus:border-red-500 transition-colors',
              errors.password ? 'border-red-500' : 'border-gray-700'
            ]"
          />
          <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
        </div>
        
        <div v-if="serverError" class="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-4 text-sm text-center">
          {{ serverError }}
        </div>
        
        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:text-gray-500 text-white font-bold py-3 rounded transition-colors duration-200 shadow-lg mt-4"
        >
          <span v-if="isLoading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
      
      <p class="mt-6 text-xs text-center text-gray-500 italic">
        * Credentials for demo: <strong>student / password123</strong>
      </p>
    </div>
  </div>
</template>
