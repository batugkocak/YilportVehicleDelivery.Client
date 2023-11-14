/* eslint-disable no-unused-vars */
import { getRoles } from "@/services/authService";

export const RoleDirective = (el, binding, vnode) => {
  const userRole = getRoles(localStorage.getItem("jwt"));
  const requiredRole = binding.value;

  if (userRole !== requiredRole && userRole !== "admin") {
    el.style.opacity = 0.5;
    el.style.pointerEvents = "none";
  }
  if (requiredRole == "admin" && !userRole.includes("admin")) {
    el.style.display = "none";
  }
};
