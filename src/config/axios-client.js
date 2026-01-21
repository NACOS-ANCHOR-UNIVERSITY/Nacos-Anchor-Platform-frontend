import axios from "axios";
// 👇 Import your store here so Axios can talk to it
import useUserStore from "../store/useUserStore";

const client = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://nacos.nextgenerationones.org/api",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN");

  //const token = useUserStore.getState().token;

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

