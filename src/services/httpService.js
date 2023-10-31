import axios from "axios";

const defaultTimeOut = 5000;
const token = localStorage.getItem("jwt");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

function get(url, queryParams = {}) {
  return axios.get(url, {
    timeout: defaultTimeOut,
    headers: config.headers,
    params: queryParams,
  });
}

function post(url, data = {}) {
  return axios.post(url, data, {
    timeout: defaultTimeOut,
    headers: config.headers,
  });
}

export default {
  get,
  post,
};
