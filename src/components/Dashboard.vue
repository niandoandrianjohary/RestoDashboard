<template>
    <div class="dashboard">
      <div v-if="unauthorized" class="error-message">
        <p><strong>Error:</strong> Unauthorized access. You do not have the necessary role to view this page.</p>
      </div>
  
      <div v-else>
        <div class="header">
            <h2>Welcome to your Dashboard, {{ user.name }}</h2>
        <button @click="logout">Logout</button>
        </div>
        

        <div class="menu">
          <button @click="currentComponent = 'ingredients'">Ingredients</button>
          <button @click="currentComponent = 'plats'">Plats</button>
          <button @click="currentComponent = 'commandes'">Commandes</button>
        </div>
  
        <component :is="currentComponentComponent" />
    
        
      </div>
    </div>
  </template>
  
  <script>
  import Ingredients from './Ingredients.vue';
  import Plats from './Plats.vue';
  import Commandes from './Commandes.vue';
  
  export default {
    data() {
      return {
        user: {},
        unauthorized: false,
        currentComponent: 'ingredients',
      };
    },
    computed: {
      currentComponentComponent() {
        if (this.currentComponent === 'ingredients') {
          return Ingredients;
        } else if (this.currentComponent === 'plats') {
          return Plats;
        } else if (this.currentComponent === 'commandes') {
          return Commandes;
        }
      }
    },
    created() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.user = user;
        if (this.user.role !== 'admin') {
          this.unauthorized = true;
          localStorage.removeItem('user');
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        }
      } else {
        this.$router.push('/login');
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('user');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Global styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }
  
  body {
    background-color: #f4f7fb;
  }
  
  /* Dashboard container */
  .dashboard {
    margin: auto;
    padding: 30px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    animation: fadeIn 0.6s ease-in-out;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }
  .header{
    display: flex
;
    align-content: center;
    align-items: center;
    justify-content: space-between;
  }
  /* Menu buttons */
  .menu {
    display: flex
;
    gap: 10px;
    /* justify-content: space-around; */
    margin-bottom: 30px;
  }
  
  button {
    padding: 14px 20px;
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
  
  /* Error message */
  .error-message {
    color: #e74c3c;
    font-weight: bold;
    padding: 15px;
    background-color: #f9ebeb;
    border: 1px solid #e74c3c;
    border-radius: 8px;
    margin-bottom: 30px;
  }
  
  /* Logout button */
  button:last-of-type {
    /* margin-top: 20px; */
    background-color: #e74c3c;
  }
  
  button:last-of-type:hover {
    background-color: #c0392b;
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
  </style>
  