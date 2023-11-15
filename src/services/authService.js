import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  try {
    if (token !== null) {
      const decoded = jwtDecode(token);

      if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      }
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
  return true;
}

function getLoginTime(token) {
  try {
    const decoded = jwtDecode(token);
    if (decoded && decoded.nbf) {
      const date = new Date(decoded.nbf * 1000);
      return date.toLocaleString();
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
}

function getUserName(token) {
  try {
    const decoded = jwtDecode(token);
    if (decoded && decoded.sub) {
      const sub = decoded.sub;
      return {
        sub: sub,
      };
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
  return null; // Return null if "sub" is not found or there was an error
}

function getRoles(token) {
  try {
    if (token === null) {
      return;
    }
    const decoded = jwtDecode(token);

    if (decoded && decoded.roles) {
      const roles = decoded.roles;
      return roles;
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
  return null; // Return null if "sub" is not found or there was an error
}

export { isTokenExpired, getUserName, getLoginTime, getRoles };
