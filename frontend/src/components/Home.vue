<template>
  <div class="home-app">
    <main class="home-body">
      <ul>
        <li class="nav-item">
          <router-link to="/cities" class="nav-link">Cities</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/states" class="nav-link">States</router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style>
.home-body ul {
  list-style: none;
  display: flex;
  margin-top: 50px;
}

.home-body ul li a {
  padding: 10px 20px;
  color: #ff0000;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: 5px;
  transition: 0.3s opacity;
}

.home-body ul li a:hover {
  opacity: 0.7;
}

.home-body {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>