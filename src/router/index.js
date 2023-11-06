import { createRouter, createWebHistory } from "vue-router";

import VehiclesView from "@/views/VehiclesView.vue";
import VehiclesOnTaskView from "@/views/VehiclesOnTaskView.vue";
import VehiclesOnTaskArchiveView from "@/views/VehiclesOnTaskArchiveView.vue";
import LoginView from "@/views/LoginView.vue";
import PredefinedTasksView from "@/views/PredefinedTasksView.vue";
import DriversView from "@/views/DriversView.vue";
import OwnersView from "@/views/OwnersView.vue";

import { isTokenExpired } from "@/services/authService";

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/vehicles",
    name: "Vehicles",
    component: VehiclesView,
  },
  {
    path: "/vehiclesOnTask",
    name: "VehiclesOnTask",
    component: VehiclesOnTaskView,
  },
  {
    path: "/archive",
    name: "Archive",
    component: VehiclesOnTaskArchiveView,
  },
  {
    path: "/predefinedTasks",
    name: "PredefinedTasks",
    component: PredefinedTasksView,
  },
  {
    path: "/drivers",
    name: "Drivers",
    component: DriversView,
  },
  {
    path: "/owners",
    name: "Owners",
    component: OwnersView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("jwt");
  if (to.name !== "Login" && !token) {
    next({ name: "Login" });
    localStorage.removeItem("jwt");
  } else if (to.name !== "Login" && isTokenExpired(token)) {
    next({
      name: "Login",
      query: {
        isExpired: true,
      },
    });
  } else next();
});

export default router;
