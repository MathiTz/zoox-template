<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Home</router-link>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/cities" class="nav-link">Cities</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/cities/create" class="nav-link"
            >Create City</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/states" class="nav-link">States</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/states/create" class="nav-link"
            >Create State</router-link
          >
        </li>
      </ul>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
