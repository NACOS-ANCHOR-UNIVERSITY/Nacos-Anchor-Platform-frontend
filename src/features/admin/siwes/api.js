import client from "@/config/axios-client";

export const getSiwesBoardData = async () => {
  const { data } = await client.get("/admin/siwes");
  return data;
};

export const postSiwesOpportunity = async (payload) => {
  const { data } = await client.post("/admin/opportunities", payload);
  return data;
};

export const updateSiwesOpportunity = async (payload) => {
  const { data } = await client.put("/admin/opportunities", payload);
  return data;
};

export const deleteSiwesOpportunity = async (id) => {
  const { data } = await client.delete(`/admin/opportunities?id=${id}`);
  return data;
};

export const moderateSiwesItem = async (payload) => {
  // Payload: { id: 1, status: 'Approved' | 'Rejected' }
  const { data } = await client.put("/admin/moderation", payload);
  return data;
};
