import axios from "axios";
import useUserStore from "@/store/useUserStore";
import { toast } from "sonner";

// Use proxy in development (vite.config.js), real URL in production
const client = axios.create({
  // Use proxy in development (vite.config.js), real URL in production
  baseURL: import.meta.env.DEV
    ? "/api"
    : import.meta.env.VITE_API_BASE_URL ||
      "https://nacos.nextgenerationones.org/api",
});

client.interceptors.request.use((config) => {
  // Pull token from the store's current state
  const token = useUserStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useUserStore.getState().logout();
      toast.error("Session expired. Please login again.");
    }
    return Promise.reject(error);
  },
);

export default client;

