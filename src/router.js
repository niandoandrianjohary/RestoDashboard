import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import Ingredients from './components/Ingredients.vue';
import Plats from './components/Plats.vue';
import Commandes from './components/Commandes.vue';
import Login from './components/Login.vue';
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/ingredients',
    name: 'Ingredients',
    component: Ingredients
  },
  {
    path: '/plats',
    name: 'Plats',
    component: Plats
  },
  {
    path: '/commandes',
    name: 'Commandes',
    component: Commandes
  }, 
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
