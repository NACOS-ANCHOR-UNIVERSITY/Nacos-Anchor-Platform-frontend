import client from "../config/axios-client";

export const authService = {
    register: async (credentials) => {
        const response = await client.post("/auth/register", credentials);
        return response.data;
    },

    login: async (credentials) => {
        const response = await client.post("/auth/login", credentials);
        return response.data;
    },
};