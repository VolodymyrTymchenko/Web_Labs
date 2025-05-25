<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <Header></Header>
    <main class="container d-flex flex-grow-1 justify-content-center align-items-center">
      <router-view />
    </main>
    <Footer></Footer>
  </div>
</template>
