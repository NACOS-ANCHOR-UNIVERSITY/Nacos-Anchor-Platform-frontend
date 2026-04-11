import client from "../config/axios-client";

export const getEvents = async () => {
  const response = await client.get("/admin/events/list");
  return response.data.data;
};


export const createEvent = async (eventData) => {
  const response = await client.post("/admin/events/create", eventData);
  return response.data;
};

export const updateEvent = async (eventId, eventData) => {
  const response = await client.put(`/admin/events/update?id=${eventId}`, eventData);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const response = await client.delete(`/admin/events/delete?id=${eventId}`);
  return response.data;
};