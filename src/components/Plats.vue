<template>
    <div class="plats">
      <h2>Plats</h2>
  
      <!-- Affichage du message de chargement si les données ne sont pas encore chargées -->
      <div v-if="loading" class="loading">Chargement des plats et ingrédients...</div>
  
      <!-- Formulaire pour ajouter un nouveau plat -->
      <form @submit.prevent="addPlat">
        <input v-model="newPlat.nom" type="text" placeholder="Nom du plat" required />
        <input v-model="newPlat.prix" type="number" placeholder="Prix" required />
        <p>
          <textarea v-model="newPlat.recette" placeholder="Recette" required></textarea>   
        </p>
  
        <div>
          <h4>Ingrédients</h4>
          <div v-for="(ingredient, index) in newPlat.ingredients" :key="index">
            <select v-model="ingredient.id">
              <option v-for="(ing, id) in ingredients" :key="id" :value="id">
                {{ ing.nom }}
              </option>
            </select>
            <input v-model="ingredient.quantite" type="number" placeholder="Quantité" required />
            <input v-model="ingredient.unite" type="text" placeholder="Unité" required />
            <button @click="removeIngredient(index)" type="button">Supprimer</button>
          </div>
          <button @click="addIngredient" type="button">Ajouter un ingrédient</button>
        </div>
  
        <button type="submit" class="butn">Ajouter Plat</button>
      </form>
  
      <!-- Liste des plats -->
      <ul>
        <li v-for="(plat, id) in plats" :key="id">
          <h3>{{ plat.nom }} - {{ plat.prix }}€</h3>
          <p>{{ plat.recette }}</p>
          <ul>
            <li v-for="(ingredient, ingredientId) in plat.ingredients" :key="ingredientId">
              {{ ingredients[ingredientId]?.nom }}: {{ ingredient.quantite }} {{ ingredient.unite }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        plats: {}, // Stocke les plats récupérés
        ingredients: {}, // Stocke les ingrédients disponibles
        newPlat: {
          nom: '',
          prix: '',
          recette: '',
          ingredients: [
            { id: '', quantite: '', unite: '' } // Structure des ingrédients pour un nouveau plat
          ]
        },
        loading: true // Indicateur de chargement
      };
    },
    created() {
      // Récupérer les ingrédients et les plats au moment de la création du composant
      this.fetchPlats();
      this.fetchIngredients();
    },
    methods: {
      // Fonction pour récupérer les ingrédients depuis l'API
      async fetchIngredients() {
        try {
          const response = await axios.get('http://localhost:8000/api/firebase/ingredients');
          this.ingredients = response.data; // Sauvegarder les ingrédients dans le state
        } catch (error) {
          console.error('Erreur lors de la récupération des ingrédients:', error);
        } finally {
          this.loading = false; // Stopper le chargement une fois les données récupérées
        }
      },
  
      // Fonction pour récupérer les plats depuis l'API
      async fetchPlats() {
        try {
          const response = await axios.get('http://localhost:8000/api/firebase/plats');
          this.plats = response.data; // Sauvegarder les plats dans le state
        } catch (error) {
          console.error('Erreur lors de la récupération des plats:', error);
        } finally {
          this.loading = false; // Stopper le chargement une fois les données récupérées
        }
      },
  
      // Fonction pour ajouter un ingrédient au plat en cours
      addIngredient() {
        this.newPlat.ingredients.push({ id: '', quantite: '', unite: '' });
      },
  
      // Fonction pour supprimer un ingrédient du plat en cours
      removeIngredient(index) {
        this.newPlat.ingredients.splice(index, 1);
      },
  
      // Fonction pour ajouter un nouveau plat
      async addPlat() {
        // Créer un objet pour les ingrédients au format correct
        const ingredientsPayload = {};
        this.newPlat.ingredients.forEach(ingredient => {
          if (ingredient.id && ingredient.quantite && ingredient.unite) {
            ingredientsPayload[`${ingredient.id}`] = {
              quantite: ingredient.quantite,
              unite: ingredient.unite
            };
          }
        });
  
        try {
          // Envoi du payload au serveur avec la structure correcte
          const response = await axios.post('http://localhost:8000/api/firebase/plats', {
            ingredients: ingredientsPayload,
            nom: this.newPlat.nom,
            prix: this.newPlat.prix,
            recette: this.newPlat.recette
          });
  
          // Ajouter le plat à la liste affichée après l'ajout
          this.plats = { ...this.plats, [response.data.plat_id]: response.data };
  
          // Réinitialiser le formulaire après l'ajout
          this.newPlat = { nom: '', prix: '', recette: '', ingredients: [{ id: '', quantite: '', unite: '' }] };
        } catch (error) {
          console.error('Erreur lors de l\'ajout du plat:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .plats {
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
  
  form {
    margin-bottom: 20px;
  }
  
  /* Champ de formulaire */
  input, textarea, select {
    padding: 10px;
    width: 20%; /* Largeur ajustée à 20% */
    margin-bottom: 10px;
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
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  
  .butn {
    margin-top: 10px;
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
  