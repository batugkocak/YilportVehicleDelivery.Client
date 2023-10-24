import axios from "axios";

const defaultTimeOut = 5000;

function get(url, queryParams = {}, headers = {}) {
  return axios.get(url, {
    timeout: defaultTimeOut,
    headers: headers,
    params: queryParams,
  });
}

function post(url, data = {}, headers = {}) {
  return axios.post(url, data, {
    timeout: defaultTimeOut,
    headers: headers,
  });
}

export default {
  get,
  post,
};
