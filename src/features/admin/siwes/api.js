import client from "@/config/axios-client";

export const getSiwesBoardData = async () => {
  const { data } = await client.get("/admin/dashboard");
  return data;
};

export const postSiwesOpportunity = async (payload) => {
  const { data } = await client.post("/admin/opportunities", payload);
  return data;
};

