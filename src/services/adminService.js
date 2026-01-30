import client from "../config/axios-client";

export const adminService = {
  getDashboard: async () => {
    const response = await client.get("/admin/dashboard");
    return response.data;
  },

  exportLogs: async () => {
    const response = await client.get("/admin/export-logs", {
      responseType: "blob",
    });
    return response.data;
  },

  createPost: async (payload) => {
    const response = await client.post("/admin/create-post", payload);
    return response.data;
  },

  getNews: async () => {
    const response = await client.get("/post/news");
    return response.data;
  },

  getPayments: async () => {
    const response = await client.get("/admin/payments");
    return response.data;
  },

  verifyPayment: async ({ id, status }) => {
    const response = await client.post("/admin/verify-payment", { id, status });
    return response.data;
  },

  recordPayment: async (formData) => {
    const response = await client.post("/admin/record-payments", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  getSiwesBoard: async () => {
    const response = await client.get("/admin/siwes");
    return response.data;
  },

  createOpportunity: async (data) => {
    const response = await client.post("/admin/opportunities", data);
    return response.data;
  },
};

export default adminService;
