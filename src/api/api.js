import axios from "axios";

const axiosConfig = {
  baseURL: "https://pre-onboarding-selection-task.shop/",
  headers: {
    "Content-Type": "application/json",
  },
};

export const request = axios.create(axiosConfig);
