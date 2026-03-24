import axios from "axios";
// 👇 Import your store here so Axios can talk to it
import useUserStore from "../store/useUserStore";

// In development, use the Vite proxy (just '/api')
// In production, use the full URL from env variable
const baseURL = import.meta.env.DEV 
  ? "/api" 
  : (import.meta.env.VITE_API_BASE_URL || "https://nacos.nextgenerationones.org/api");

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  const token =
    // Prefer token from the Zustand store (persisted) so we stay in sync with app state
    useUserStore.getState().token ||
    // Fallback: some flows may store a raw token directly in localStorage
    localStorage.getItem("token") ||
    localStorage.getItem("ACCESS_TOKEN") ||
    // Final fallback: check the persisted Zustand storage key (nacos-auth-storage)
    (() => {
      try {
        const raw = localStorage.getItem("nacos-auth-storage");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed?.state?.token || null;
      } catch (e) {
        return null;
      }
    })();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      useUserStore.getState().logout();
    }
    throw error;
  },
);

export default client;
