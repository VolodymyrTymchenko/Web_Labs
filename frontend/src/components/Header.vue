<script setup>

</script>

<template>
  <div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand"> <i class="bi bi-calculator"></i> Classic Calculator </a>
      <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link" :class="{ 'active': $route.path === '/' }">Home</router-link>
          <router-link to="/calculator" class="nav-item nav-link" active-class="active">Calculator</router-link>
          <router-link to="/profile" class="nav-item nav-link" active-class="active">Profile</router-link>
        </div>
        <div class="navbar-nav ms-auto">
          <router-link to="/register" class="nav-item nav-link" active-class="active">Register</router-link>
          <router-link to="/login" class="nav-item nav-link" active-class="active">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>
