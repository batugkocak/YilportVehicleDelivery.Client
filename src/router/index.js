import { createRouter, createWebHistory } from "vue-router";

import VehiclesView from "@/views/VehiclesView.vue";
import VehiclesOnTaskView from "@/views/VehiclesOnTaskView.vue";
import VehiclesOnTaskArchiveView from "@/views/VehiclesOnTaskArchiveView.vue";
import LoginView from "@/views/LoginView.vue";

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
