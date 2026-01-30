import axios from "axios";

// In development, use the Vite proxy (just '/api')
// In production, use the full URL from env variable
const baseURL = import.meta.env.DEV 
  ? "/api" 
  : (import.meta.env.VITE_API_BASE_URL || "https://nacos.nextgenerationones.org/api");

const client = axios.create({
  baseURL,
});


client.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//this will automatically log it out when ther's 401 error
client.interceptors.response.use(
  (response) => response,
  (error) => {
    const {response} = error;
    if (response && response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
    }
    throw error;
  }
);

export default client;
