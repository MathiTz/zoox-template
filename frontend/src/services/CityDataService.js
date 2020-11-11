import http from "../http-common";

class CityDataService {
  getAll() {
    return http.get("/cities/");
  }

  get(name) {
    return http.get(`/cities/${name}`);
  }

  create(data) {
    return http.post("/cities", data);
  }

  update(name, data) {
    return http.put(`/cities/${name}`, data);
  }

  delete(name) {
    return http.delete(`/cities/${name}`);
  }
}

export default new CityDataService();
