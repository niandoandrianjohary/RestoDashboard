<template>
    <div class="login-container">
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
        errorMessage: ''
      };
    },
    methods: {
      async login() {
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
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  form div {
    margin-bottom: 12px;
  }
  label {
    display: block;
    margin-bottom: 4px;
  }
  input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #45a049;
  }
  .error {
    color: red;
    font-size: 14px;
  }
  </style>
  