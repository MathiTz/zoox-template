import http from "../http-common";

class StateDataService {
  getAll() {
    return http.get("/states/");
  }

  get(abbr) {
    return http.get(`/states/${abbr}/`);
  }

  getCitiesWithinState(abbr) {
    return http.get(`/states/${abbr}/cities/`);
  }

  create(data) {
    return http.post("/states/", data);
  }

  update(abbr, data) {
    return http.put(`/states/${abbr}`, data);
  }

  delete(abbr) {
    return http.delete(`/states/${abbr}`);
  }
}

export default new StateDataService();
