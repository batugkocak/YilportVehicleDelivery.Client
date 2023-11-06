import jwt from "vue-jwt-decode";

function isTokenExpired(token) {
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
  return true;
}

function getLoginTime(token) {
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.nbf) {
      const date = new Date(decoded.nbf * 1000);
      return date.toLocaleString();
    }
  } catch (error) {
    console.error("Error decoding JWT:", error);
  }
}

function getRole(token) {
  try {
    const decoded = jwt.decode(token);
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

export { isTokenExpired, getRole, getLoginTime };
