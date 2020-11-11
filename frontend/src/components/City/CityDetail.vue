<template>
  <div v-if="currentCity" class="edit-form">
    <h4>City Details</h4>
    <form>
      <div class="form-group">
        <label for="name">City</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentCity.name"
        />
      </div>

      <div class="form-group">
        <label for="state">State</label>
        <select v-model="currentCity.stateId._id">
          <option
            v-for="state in states"
            v-bind:key="state._id"
            v-bind:value="state._id"
          >
            {{ state.abbreviation }}
          </option>
        </select>
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteCity">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateCity">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a City...</p>
  </div>
</template>

<script>
import CityDataService from "../../services/CityDataService";
import StateDataService from "../../services/StateDataService";

export default {
  name: "cities-details",
  data() {
    return {
      currentCity: null,
      currentCityName: "",
      message: "",
      states: [],
      stateId: "",
    };
  },

  methods: {
    getCity(name) {
      CityDataService.get(name)
        .then((response) => {
          this.currentCity = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getStates() {
      StateDataService.getAll()
        .then((response) => {
          this.states = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateCity() {
      const data = {
        name: this.currentCity.name,
        stateId: this.currentCity.stateId._id,
      };

      CityDataService.update(this.currentCityName, data)
        .then((response) => {
          this.currentCity = response.data;
          this.$router.push("/cities/");
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },

    deleteCity() {
      CityDataService.delete(this.currentCityName)
        .then(() => {
          this.message = "The city was deleted successfully!";
          this.$router.push("/cities/");
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },
  },

  mounted() {
    this.message = "";
    this.getStates();
    this.getCity(this.$route.params.name);
    this.currentCityName = this.$route.params.name;
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>