<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Cities List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(city, index) in cities"
          :key="index"
          @click="setActiveCity(city, index)"
        >
          {{ city.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentCity">
        <h4>City</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentCity.name }}
        </div>
        <div>
          <label><strong>State:</strong></label>
          {{ currentCity.stateId.abbreviation }}
        </div>

        <a class="badge badge-warning" :href="'/cities/' + currentCity.name">
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a City</p>
      </div>
    </div>
  </div>
</template>

<script>
import CityDataService from "../../services/CityDataService";

export default {
  name: "cities-list",
  data() {
    return { cities: [], currentCity: null, currentIndex: -1 };
  },

  methods: {
    getAllCities() {
      CityDataService.getAll()
        .then((response) => {
          this.cities = response.data;
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },

    refreshList() {
      this.getAllCities();
      this.currentCity = null;
      this.currentIndex = -1;
    },

    setActiveCity(city, index) {
      this.currentCity = city;
      this.currentIndex = index;
    },
  },

  mounted() {
    this.getAllCities();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>