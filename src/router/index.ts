import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("../components/MovieList.vue"),
  },
  {
    path: '/movie/:id',
    name: 'MovieDetail',
    component: () => import("../components/MovieDetail.vue"),
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import("../views/FavoritesView.vue"),
    meta: { requiresAuth: true }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});