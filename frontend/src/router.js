import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./components/Home"),
    },
    {
      path: "/cities",
      name: "cities-list",
      component: () => import("./components/City/CityList"),
    },
    {
      path: "/cities/create",
      name: "city-create",
      component: () => import("./components/City/AddCity"),
    },
    {
      path: "/cities/:name",
      name: "cities-details",
      component: () => import("./components/City/CityDetail"),
    },
    {
      path: "/states",
      name: "states-list",
      component: () => import("./components/State/StateList"),
    },
    {
      path: "/states/create",
      name: "state-create",
      component: () => import("./components/State/AddState"),
    },
    {
      path: "/states/:abbr",
      name: "state-details",
      component: () => import("./components/State/StateDetail"),
    },
    {
      path: "/states/:abbr/cities",
      name: "state-with-city",
      component: () => import("./components/State/CityListedByState"),
    },
  ],
});
