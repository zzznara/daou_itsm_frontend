// local vue api axios instance
import { useAppStore } from "@/stores/app";
import axios from "axios";

const VUE_APP_API_BASE_URL = "http://localhost:7080/";

function apiInstance() {
  const instance = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL,
    baseURL: VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function apiInstanceWithAuth() {
  const appStore = useAppStore();
  const instance = axios.create({
    // baseURL: process.env.VUE_APP_API_BASE_URL,
    baseURL: VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: appStore.Authorization,
      "Access-Control-Allow-Credentials": true,
    },
  });
  return instance;
}

export { apiInstance, apiInstanceWithAuth };
