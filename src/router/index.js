import { createRouter, createWebHistory } from "vue-router";

import VehiclesView from "@/views/VehiclesView.vue";
import VehiclesOnTaskView from "@/views/VehiclesOnTaskView.vue";
import VehiclesOnTaskArchiveView from "@/views/VehiclesOnTaskArchiveView.vue";
import LoginView from "@/views/LoginView.vue";

//Lazy Load:
const BrandsView = () => import("@/views/BrandsView.vue");
const DepartmentsView = () => import("@/views/DepartmentsView.vue");
const OwnersView = () => import("@/views/OwnersView.vue");
const DriversView = () => import("@/views/DriversView.vue");
const PredefinedTasksView = () => import("@/views/PredefinedTasksView.vue");
const AdminView = () => import("@/views/AdminView.vue");

import { isTokenExpired, getRoles } from "@/services/authService";

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
  {
    path: "/departments",
    name: "Departments",
    component: DepartmentsView,
  },
  {
    path: "/brands",
    name: "Brands",
    component: BrandsView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("jwt");
  let userRoles = [];
  if (token) {
    userRoles = getRoles(token);
  }

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
  } else if (!userRoles.includes("admin") && to.name === "Admin") {
    next({ name: "Vehicles" });
  } else next();
});

export default router;
