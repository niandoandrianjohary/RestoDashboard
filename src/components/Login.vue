<template>
  <div class="login-container">
    <!-- Affichage du message de chargement si la requête est en cours -->
    <div v-if="loading" class="loading">Chargement...</div>

    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      loading: false, // Indicateur de chargement
    };
  },
  methods: {
    async login() {
      this.loading = true; // Démarrer le chargement
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password
        });

        // Si la connexion est réussie, stocker l'utilisateur
        localStorage.setItem('user', JSON.stringify(response.data));

        // Rediriger l'utilisateur ou mettre à jour l'état (par exemple, vers un dashboard)
        this.$router.push('/dashboard');
      } catch (error) {
        // Gérer les erreurs d'authentification
        this.errorMessage = 'Identifiants incorrects. Essayez à nouveau.';
      } finally {
        this.loading = false; // Fin du chargement
      }
    }
  }
};
</script>

<style scoped>
/* Styles généraux */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  background-color: #f4f7fb;
}

/* Conteneur de la connexion */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.6s ease-in-out;
}

/* Titre */
h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* Champs du formulaire */
form div {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
}

input {
  width: 100%;
  padding: 12px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Bouton de connexion */
button {
  width: 100%;
  padding: 14px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

/* Message d'erreur */
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

/* Animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Styles pour le chargement */
.loading {
  font-size: 18px;
  color: #3498db;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
</style>
