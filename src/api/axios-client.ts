import axios from "axios";

import { apiToken } from "../composables";

export const axiosClient = axios.create({
  baseURL: "https://api.wanikani.com/v2",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  if (apiToken.value) {
    config.headers.Authorization = `Bearer ${apiToken.value}`;
  }

  return config;
});
