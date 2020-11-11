<template>
  <div v-if="currentState" class="edit-form">
    <h4>State Details</h4>
    <form>
      <div class="form-group">
        <label for="name">State</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="currentState.name"
        />
      </div>

      <div class="form-group">
        <label for="abbreviation">Abbreviation</label>
        <input
          type="text"
          class="form-control"
          id="abbreviation"
          required
          v-model="currentState.abbreviation"
          name="abbreviation"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2" @click="deleteState">Delete</button>

    <button type="submit" class="badge badge-success" @click="updateState">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a State...</p>
  </div>
</template>

<script>
import StateDataService from "../../services/StateDataService";

export default {
  name: "state-details",
  data() {
    return {
      currentState: null,
      currentStateAbbr: "",
      message: "",
      canDelete: false,
    };
  },

  methods: {
    getState(name) {
      StateDataService.get(name)
        .then((response) => {
          this.currentState = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateState() {
      const data = {
        name: this.currentState.name,
        abbreviation: this.currentState.abbreviation,
      };

      StateDataService.update(this.currentStateAbbr, data)
        .then((response) => {
          this.currentState = response.data;
          this.$router.push("/states/");
        })
        .catch((e) => {
          alert(e.response.data.error);
        });
    },

    deleteState() {
      StateDataService.getCitiesWithinState(this.currentStateAbbr)
        .then((response) => {
          if (response.data.length > 0) {
            alert("Cannot delete State because you have cities associated");

            this.canDelete = false;
          } else {
            this.canDelete = true;
          }
        })
        .catch((e) => alert(e.response.data.error));

      if (this.canDelete) {
        StateDataService.delete(this.currentStateAbbr)
          .then(() => {
            this.message = "The state was deleted successfully!";
            this.$router.push("/states/");
          })
          .catch((e) => {
            alert(e.response.data.error);
          });
      }
    },
  },

  mounted() {
    this.message = "";
    this.getState(this.$route.params.abbr);
    this.currentStateAbbr = this.$route.params.abbr;
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>