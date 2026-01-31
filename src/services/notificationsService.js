import client from "@/config/axios-client";

export const getNotificationsData = async () => {
  const { data } = await client.get("/notifications");
  return data.data;
};

// no endpoint yet tho...
export const markNotificationAsRead = async (id) => {
  const { data } = await client.patch(`/notifications/${id}/read`);
  return data;
};
