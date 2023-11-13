/* eslint-disable no-unused-vars */
import { getRoles } from "@/services/authService";

export const RoleDirective = (el, binding, vnode) => {
  const userRoles = getRoles(localStorage.getItem("jwt"));
  const requiredRole = binding.value;

  if (requiredRole == "admin" && !userRoles.includes("admin")) {
    el.style.display = "none";
  } //TODO: check if it works

  if (!userRoles.includes(requiredRole) && !userRoles.includes("admin")) {
    // el.style.display = "none";
    el.style.opacity = 0.5;
    el.style.cursor = "not-allowed !important";
    el.style.pointerEvents = "none";
    console.log(el);
  }
};
