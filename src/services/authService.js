import client from "@/config/axios-client";
import useUserStore from "@/store/useUserStore";

export const authService = {
  login: async (credentials) => {
    const response = await client.post("/auth/login", credentials);
    const { data } = response.data;

    if (data?.token && data?.user) {
      // Sync the response to Zustand Store
      useUserStore.getState().login(data.user, data.token);
    }
    return data;
  },

  register: async (credentials) => {
    const response = await client.post("/auth/register", credentials);
    return response.data;
  },

  logout: () => {
    // This clears state AND local storage via persist middleware
    useUserStore.getState().logout();
  },
};

