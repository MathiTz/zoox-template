<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="city.name"
          name="name"
        />
      </div>

      <div class="form-group state-select">
        <label for="state">State</label>
        <select v-model="city.stateId">
          <option
            v-for="state in city.states"
            v-bind:key="state._id"
            v-bind:value="state._id"
          >
            {{ state.abbreviation }}
          </option>
        </select>
      </div>

      <button @click="createCity" class="btn btn-success">Create</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newCity">
        Create another city
      </button>
    </div>
  </div>
</template>

<script>
import CityDataService from "../../services/CityDataService";
import StateDataService from "../../services/StateDataService";

export default {
  name: "city-create",
  data() {
    return {
      city: {
        id: null,
        name: "",
        stateId: "",
        states: [],
      },
      submitted: false,
    };
  },
  methods: {
    createCity() {
      var data = {
        name: this.city.name,
        stateId: this.city.stateId,
      };

      CityDataService.create(data)
        .then((response) => {
          this.city.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },

    newCity() {
      this.submitted = false;
      this.city = {};
    },

    getAllStates() {
      StateDataService.getAll()
        .then((response) => {
          this.city.states = response.data;
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },
  },

  mounted() {
    this.getAllStates();
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.state-select {
  display: flex;
  flex-direction: column;
}
</style>