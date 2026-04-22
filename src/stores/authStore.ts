import { ref, computed } from "vue";
import { defineStore } from 'pinia';
import { fakeLogin } from "../api/localDb.ts";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('authStore', () => {
  const token = ref<string | null>(localStorage.getItem('token'));
  const router = useRouter();

  const isLoggedIn = computed(() => !!token.value);

  async function login() {
    try {
      const data = await fakeLogin();
      token.value = data.token;
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('token');
    // Force redirect to login or home
    if (router) {
      router.push('/');
    }
  }

  return { token, isLoggedIn, login, logout };
});
