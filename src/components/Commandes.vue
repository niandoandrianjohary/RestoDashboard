<template>
  <div class="commandes">
    <!-- Affichage du message de chargement si les données ne sont pas encore chargées -->
    <div v-if="loading" class="loading">Chargement des commandes...</div>

    <!-- Commandes en attente ou en préparation -->
    <div v-if="pendingCommandes.length > 0">
      <h2>Commandes en attente / En préparation</h2>
      <div v-for="(commande, index) in pendingCommandes" :key="index" class="commande">
        <p><strong>#{{ commande.id }}</strong></p>
        <p><strong>User ID : {{ commande.user_id }}</strong></p>
        <div v-for="(plat, platId) in commande.plats" :key="platId">
          <p>- {{ plats[platId]?.nom }} ({{ plat.quantite }}) </p>
        </div>
        <button v-if="commande.status !== 'Prête'" @click="updateCommandeStatus(commande.id, 'Prête')">Prête</button>
      </div>
    </div>

    <!-- Commandes prêtes -->
    <div v-if="readyCommandes.length > 0">
      <h2>Commandes Prêtes</h2>
      <div v-for="(commande, index) in readyCommandes" :key="index" class="commande">
        <p><strong>#{{ commande.id }}</strong></p>
        <p><strong>User ID : {{ commande.user_id }}</strong></p>
        <div v-for="(plat, platId) in commande.plats" :key="platId">
          <p>- {{ plats[platId]?.nom }} ({{ plat.quantite }}) </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      commandes: [], // Liste des commandes
      plats: {}, // Détails des plats
      loading: true // Indicateur de chargement
    };
  },
  computed: {
    // Commandes en attente ou en préparation
    pendingCommandes() {
      return this.commandes.filter(commande => 
        commande.status === 'En attente' || commande.status === 'En préparation'
      );
    },

    // Commandes prêtes
    readyCommandes() {
      return this.commandes.filter(commande => commande.status === 'Prête');
    }
  },
  methods: {
    // Charger les commandes depuis l'API
    async loadCommandes() {
      try {
        const commandesResponse = await axios.get('http://localhost:8000/api/firebase/commandes');
        console.log('Commandes:', commandesResponse.data); // Vérifie la structure des données

        // Assure-toi que chaque commande a un champ `id` basé sur la clé de l'objet
        this.commandes = Object.keys(commandesResponse.data).map(key => ({
          ...commandesResponse.data[key],
          id: key // Ajoute l'ID qui est la clé de l'objet
        }));

        // Charger les plats depuis l'API
        const platsResponse = await axios.get('http://localhost:8000/api/firebase/plats');
        console.log('Plats:', platsResponse.data); // Vérifie les plats
        this.plats = platsResponse.data; // Enregistrer les plats
      } catch (error) {
        console.error('Erreur lors du chargement des commandes ou des plats:', error);
      } finally {
        this.loading = false; // Stopper le chargement une fois les données récupérées
      }
    },

    // Mettre à jour le statut d'une commande
    async updateCommandeStatus(commandeId, newStatus) {
      try {
        const response = await axios.patch(
          `http://localhost:8000/api/firebase/commandes/${commandeId}`,
          { status: newStatus }
        );
        // Mettre à jour localement le statut de la commande
        const commande = this.commandes.find(c => c.id === commandeId);
        commande.status = newStatus;
        alert('Commande mise à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de la commande:', error);
      }
    }
  },
  created() {
    this.loadCommandes(); // Charger les commandes dès que le composant est créé
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

/* Conteneur des commandes */
.commandes {
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

/* Commande */
.commande {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

/* Boutons */
button {
  padding: 14px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 7px;
}

button:hover {
  background-color: #2980b9;
}

p{
  margin: 7px;
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
