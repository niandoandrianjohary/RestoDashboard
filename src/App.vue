<template>
    <div id="app">
      <router-link to="/login">Login</router-link> | 
      <router-link to="/dashboard">Dashboard</router-link>
      <router-view></router-view> <!-- Affiche le composant actuel -->
    </div>
  </template>
  