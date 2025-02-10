<template>
    <div class="ingredients">
      <h2>Ingrédients</h2>
  
      <!-- Affichage du message de chargement si les données ne sont pas encore chargées -->
      <div v-if="loading" class="loading">Chargement des ingrédients...</div>
  
      <!-- Formulaire pour ajouter un nouvel ingrédient -->
      <form @submit.prevent="addIngredient">
        <input v-model="newIngredient.nom" type="text" placeholder="Nom de l'ingrédient" required />
        <button type="submit">Ajouter Ingrédient</button>
      </form>
  
      <!-- Liste des ingrédients -->
      <ul>
        <li v-for="(ingredient, id) in ingredients" :key="id">
          {{ ingredient.nom }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        ingredients: {}, // Stocke les ingrédients récupérés
        newIngredient: { nom: '' }, // Données du nouvel ingrédient à ajouter
        loading: true // Indicateur de chargement
      };
    },
    created() {
      // Récupérer les ingrédients au moment de la création du composant
      this.fetchIngredients();
    },
    methods: {
      // Fonction pour récupérer les ingrédients depuis l'API
      async fetchIngredients() {
        try {
          const response = await axios.get('http://localhost:8000/api/firebase/ingredients');
          this.ingredients = response.data; // Sauvegarder les données dans le state
        } catch (error) {
          console.error('Erreur lors de la récupération des ingrédients:', error);
        } finally {
          this.loading = false; // Stopper le chargement une fois les données récupérées
        }
      },
  
      // Fonction pour ajouter un nouvel ingrédient
      async addIngredient() {
        try {
          const response = await axios.post('http://localhost:8000/api/firebase/ingredients', {
            nom: this.newIngredient.nom // Envoi du nom de l'ingrédient
          });
  
          // Si l'ajout est réussi, mettre à jour la liste des ingrédients
          this.ingredients = { ...this.ingredients, [response.data.ingredient_id]: { nom: this.newIngredient.nom }};
  
          // Réinitialiser le formulaire après l'ajout
          this.newIngredient.nom = '';
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'ingrédient:', error);
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
  
  /* Conteneur des ingrédients */
  .ingredients {
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
  
  /* Formulaire d'ajout d'ingrédient */
  form {
    margin-bottom: 20px;
  }
  
  input {
    padding: 14px;
    width: 20%;
    margin-right: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
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
  
  /* Liste des ingrédients */
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
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
  