import axios from "axios";
// 👇 Import your store here so Axios can talk to it
import useUserStore from "../store/useUserStore";

const client = axios.create({
  // ⚠️ Updated to match the API documentation you shared earlier
  baseURL: "/api",
  headers: {
    "Accept": "application/json",
  },
});

client.interceptors.request.use((config) => {
  // 👇 CHANGE: Read the token from the Zustand Store directly
  const token = useUserStore.getState().token;

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
      // 👇 CHANGE: Call the store's logout function
      // This correctly updates the UI AND clears localStorage at the same time
      useUserStore.getState().logout();
    }
    throw error;
  }
);

export default client;