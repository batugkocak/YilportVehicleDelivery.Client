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

export { isTokenExpired };
