import axios from "axios";

const fetchApi = () => {
  const defaultOptions = {
    baseURL: process.env.REACT_APP_API_PATH,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      const status = err.status || (err.response ? err.response.status : 0);
      if (status === 403 || status === 401) {
      }
      return Promise.reject(err);
    }
  );

  return instance;
};

export default fetchApi();
