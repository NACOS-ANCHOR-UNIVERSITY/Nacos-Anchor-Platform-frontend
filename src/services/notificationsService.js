import client from "@/config/axios-client";

export const getNotificationsData = async () => {
  const { data } = await client.get("/portfolio/me");
  return data.data;
};

