import client from "@/config/axios-client";

export const getSiwesBoardData = async () => {
  const { data } = await client.get("/admin/siwes");
  return data;
};

export const postSiwesOpportunity = async (payload) => {
  const { data } = await client.post("/admin/siwes", payload);
  return data;
};
