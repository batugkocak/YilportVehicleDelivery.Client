import axios from "axios";

const defaultTimeOut = 5000;

function getHeaders() {
  const token = localStorage.getItem("jwt");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return config;
}

async function get(url, queryParams = {}) {
  const config = await getHeaders();
  return axios.get(url, {
    timeout: defaultTimeOut,
    headers: config.headers,
    params: queryParams,
  });
}

async function post(url, data = {}) {
  const config = await getHeaders();
  return axios.post(url, data, {
    timeout: defaultTimeOut,
    headers: config.headers,
  });
}

export default {
  get,
  post,
};
