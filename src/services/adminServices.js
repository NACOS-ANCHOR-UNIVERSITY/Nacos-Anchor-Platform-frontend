import apiClient from "./apiClient";

export const adminService = {
  getPayments: () => apiClient.get("/admin/payments"),
  getSiwesDashboard: () => apiClient.get("/admin/siwes"),
  postSiwesOpportunity: (data) => apiClient.post("/admin/siwes", data),
};