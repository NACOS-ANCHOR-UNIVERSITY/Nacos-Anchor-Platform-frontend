import client from "../config/axios-client";

/**
 * Fetch events dashboard statistics
 * @returns {Promise<{total_events: number, upcoming_events: number, past_events: number, draft_events: number}>}
 */
export const getEventsDashboard = async () => {
  const response = await client.get("/admin/events/dashboard");
  return response.data.data;
};

/**
 * Fetch all events (latest first)
 * @returns {Promise<Array>}
 */
export const getEvents = async () => {
  const response = await client.get("/admin/events");
  return response.data.data;
};

/**
 * Create a new event
 * @param {Object} eventData
 * @param {string} eventData.title
 * @param {string} eventData.category
 * @param {string} eventData.image_url
 * @param {string} eventData.event_date - Format: YYYY-MM-DD
 * @param {string} eventData.time_range - e.g., "10:00 AM - 2:00 PM"
 * @param {string} eventData.location
 * @param {string} eventData.description
 * @param {string} eventData.button_text
 * @param {string} eventData.registration_link
 * @param {number} eventData.is_sold_out - 0 or 1
 * @returns {Promise<Object>}
 */
export const createEvent = async (eventData) => {
  const response = await client.post("/admin/events", eventData);
  return response.data;
};

/**
 * Update an existing event
 * @param {number} eventId
 * @param {Object} eventData - Same fields as createEvent
 * @returns {Promise<Object>}
 */
export const updateEvent = async (eventId, eventData) => {
  const response = await client.put(`/admin/events/update?id=${eventId}`, eventData);
  return response.data;
};

/**
 * Delete an event
 * @param {number} eventId
 * @returns {Promise<Object>}
 */
export const deleteEvent = async (eventId) => {
  const response = await client.delete(`/admin/events/delete?id=${eventId}`);
  return response.data;
};
