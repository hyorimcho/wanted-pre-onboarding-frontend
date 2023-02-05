import axios from "axios";

const axiosConfig = {
  baseURL: "https://pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json",
  },
};

export const request = axios.create(axiosConfig);

request.interceptors.request.use((config) => {
  const token = localStorage.token;

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
