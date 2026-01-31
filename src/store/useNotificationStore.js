import { create } from "zustand";
import { getNotificationsData } from "@/services/notificationsService";

const useNotificationStore = create((set, get) => ({
  notifications: [],
  loading: false,
  error: null,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const data = await getNotificationsData();
      set({ notifications: data || [], error: null });
    } catch (err) {
      console.error("Error fetching notifications:", err);
      set({ error: "Failed to load notifications" });
    } finally {
      set({ loading: false });
    }
  },

  // mark a single notification as read locally
  markAsRead: (id) => {
    const { notifications } = get();
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, is_read: true } : n,
    );
    set({ notifications: updated });
  },

  // total unread count
  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.is_read).length;
  },
}));

export default useNotificationStore;

