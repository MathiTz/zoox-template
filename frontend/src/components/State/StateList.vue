<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>States List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(state, index) in states"
          :key="index"
          @click="setActiveState(state, index)"
        >
          {{ state.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentState">
        <h4>State</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentState.name }}
        </div>
        <div>
          <label><strong>Abreviation:</strong></label>
          {{ currentState.abbreviation }}
        </div>

        <a
          class="edit-button badge badge-warning"
          :href="'/states/' + currentState.abbreviation"
        >
          Edit
        </a>
        <a
          class="badge badge-warning"
          :href="'/states/' + currentState.abbreviation + '/cities'"
        >
          All Cities
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a State</p>
      </div>
    </div>
  </div>
</template>

<script>
import StateDataService from "../../services/StateDataService";

export default {
  name: "states-list",
  data() {
    return { states: [], currentState: null, currentIndex: -1 };
  },

  methods: {
    getAllStates() {
      StateDataService.getAll()
        .then((response) => {
          this.states = response.data;
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },

    refreshList() {
      this.getAllStates();
      this.currentState = null;
      this.currentIndex = -1;
    },

    setActiveState(state, index) {
      this.currentState = state;
      this.currentIndex = index;
    },
  },

  mounted() {
    this.getAllStates();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}

.edit-button {
  margin-right: 20px;
}
</style>