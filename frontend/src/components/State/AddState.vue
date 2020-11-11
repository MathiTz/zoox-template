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
          v-model="state.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="abbreviation">Abbreviation</label>
        <input
          type="text"
          class="form-control"
          id="abbreviation"
          required
          v-model="state.abbreviation"
          name="abbreviation"
        />
      </div>

      <button @click="createState" class="btn btn-success">Create</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newState">
        Create another state
      </button>
    </div>
  </div>
</template>

<script>
import StateDataService from "../../services/StateDataService";

export default {
  name: "state-create",
  data() {
    return {
      state: {
        stateId: null,
        name: "",
        abbreviation: "",
      },
      submitted: false,
    };
  },
  methods: {
    createState() {
      const data = {
        name: this.state.name,
        abbreviation: this.state.abbreviation,
      };

      StateDataService.create(data)
        .then((response) => {
          this.state.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },

    newState() {
      this.submitted = false;
      this.state = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>