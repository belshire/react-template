import axios from 'axios';
import config from '../config';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  if (__SERVER__) {
    return config.getApiUrl() + adjustedPath;
  }

  return adjustedPath;
}

const ApiClient = {
  get(path, {params} = {}) {
    return axios.get(formatUrl(path), {params: params});
  },

  post(path, {params, data} = {}) {
    return axios.post(formatUrl(path), data, {
      params: params
    });
  },

  put(path, {params, data} = {}) {
    return axios.put(formatUrl(path), data, {
      params: params
    });
  },

  patch(path, {params, data} = {}) {
    return axios.patch(formatUrl(path), data, {
      params: params
    });
  },

  del(path, {params} = {}) {
    return axios.delete(formatUrl(path), {
      params: params
    });
  }
};

export default ApiClient;
