// Composables
import { createRouter, createWebHistory } from "vue-router";

import VehiclesView from "@/views/VehiclesView.vue";
import VehiclesOnTaskView from "@/views/VehiclesOnTaskView.vue";
import VehiclesOnTaskArchiveView from "@/views/VehiclesOnTaskArchiveView.vue";

const routes = [
  {
    path: "/",
    redirect: { name: "vehicles" },
  },
  {
    path: "/vehicles",
    name: "vehicles",
    component: VehiclesView,
  },
  {
    path: "/vehiclesOnTask",
    name: "vehicles-on-task",
    component: VehiclesOnTaskView,
    children: [
      {
        path: "archive",
        name: "archive",
        component: VehiclesOnTaskArchiveView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
