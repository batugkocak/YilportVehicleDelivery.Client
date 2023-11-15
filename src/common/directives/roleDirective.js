/* eslint-disable no-unused-vars */
import { getRoles } from "@/services/authService";

function handleUnauthorizedAccess(el) {
  el.style.opacity = 0.5;
  el.style.pointerEvents = "none";
}

export const RoleDirective = (el, binding, vnode) => {
  const userRole = getRoles(localStorage.getItem("jwt"));

  if (userRole === undefined) {
    return;
  }

  const requiredRoles = binding.value;

  console.log("User:", userRole);
  console.log("Required: ", requiredRoles);

  // Condition 1: If user's role is admin, allow access to everything
  if (userRole === "admin") {
    return;
  }

  // Condition 2: If v-role="[`admin`]" and user is not admin, hide the component
  if (
    requiredRoles.includes("admin") &&
    requiredRoles.includes("superuser") &&
    userRole !== "user"
  ) {
    return;
  }
  if (requiredRoles.includes("admin") && userRole !== "admin") {
    el.style.display = "none";
  }
  if (!requiredRoles.includes(userRole)) {
    // Condition 3: If user's role is not in requiredRoles, call handleUnauthorizedAccess
    handleUnauthorizedAccess(el);
  }
};
