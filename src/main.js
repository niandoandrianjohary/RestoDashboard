import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importer le routeur mis à jour

createApp(App)
  .use(router) // Ajouter le routeur à l'application
  .mount('#app');
