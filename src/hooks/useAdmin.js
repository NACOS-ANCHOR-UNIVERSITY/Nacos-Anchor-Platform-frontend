import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "../services";

/**
 * Query key factory for admin
 * Used for: Admin Finance Dashboard & Admin SIWES Board
 */
export const adminKeys = {
  all: ["admin"],
  payments: () => [...adminKeys.all, "payments"],
  siwesBoard: () => [...adminKeys.all, "siwes-board"],
  dashboard: () => [...adminKeys.all, "dashboard"],
  eventsDashboard: () => [...adminKeys.all, "events-dashboard"],
  events: () => [...adminKeys.all, "events"],
};

// ===== ADMIN MAIN DASHBOARD =====

export const useAdminDashboard = (options = {}) => {
  return useQuery({
    queryKey: adminKeys.dashboard(),
    queryFn: adminService.getDashboard,
    staleTime: 5 * 60 * 1000,
    retry: false,
    ...options,
  });
};

/**
 * Hook to export admin logs
 */
export const useExportLogs = () => {
  return useMutation({
    mutationFn: adminService.exportLogs,
    onSuccess: (data) => {
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `admin-logs-${new Date().toISOString()}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
  });
};

/**
 * Hook to create a new post
 * Endpoint: POST /admin/create-post
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createPost,
    onSuccess: () => {
      // Invalidate dashboard query to potentially show new activity?
      // Or just toast success
      queryClient.invalidateQueries({ queryKey: adminKeys.dashboard() });
    },
  });
};

// ===== ADMIN FINANCE DASHBOARD =====

/**
 * Hook to get admin payments dashboard
 * Endpoint: GET /admin/payments
 *
 * Returns: metrics (total_revenue, pending_approvals, approved_receipts, verification_rate)
 *          and transactions array
 *
 * @example
 * const { data, isLoading, error } = useAdminPayments();
 * const { metrics, transactions } = data?.data || {};
 */
export const useAdminPayments = (options = {}) => {
  return useQuery({
    queryKey: adminKeys.payments(),
    queryFn: adminService.getPayments,
    staleTime: 2 * 60 * 1000,
    retry: false,
    ...options,
  });
};

/**
 * Hook to Approve/Reject Payment
 */
export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.verifyPayment,
    onSuccess: () => {
      // Refresh the table after an action
      queryClient.invalidateQueries({ queryKey: adminKeys.payments() });
    },
  });
};

// ===== ADMIN SIWES BOARD =====

/**
 * Hook to get admin SIWES board data
 * Endpoint: GET /admin/siwes
 *
 * Returns: metrics (active_opportunities, pending_logs, placed_students),
 *          moderation_queue array, and listings array
 *
 * @example
 * const { data, isLoading, error } = useAdminSiwesBoard();
 * const { metrics, moderation_queue, listings } = data?.data || {};
 */
export const useAdminSiwesBoard = (options = {}) => {
  return useQuery({
    queryKey: adminKeys.siwesBoard(),
    queryFn: adminService.getSiwesBoard,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};

/**
 * Hook for creating a new SIWES opportunity
 * Endpoint: POST /admin/siwes
 *
 * @example
 * const createOpportunity = useCreateOpportunity();
 *
 * createOpportunity.mutate({
 *   company_name: "MTN Nigeria",
 *   role_title: "Data Analyst Intern",
 *   location: "Ikoyi, Lagos",
 *   duration: "6 Months",
 *   requirements: "SQL, Excel, Python"
 * });
 */
export const useCreateOpportunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createOpportunity,
    onSuccess: () => {
      // Invalidate SIWES board query to refetch updated data
      queryClient.invalidateQueries({ queryKey: adminKeys.siwesBoard() });
    },
  });
};

// ===== ADMIN EVENTS DASHBOARD =====

/**
 * Hook to get admin events dashboard data
 * Endpoint: GET /admin/events/dashboard
 *
 * Returns: metrics (total_events, upcoming_events, past_events, draft_events)
 *
 * @example
 * const { data, isLoading, error } = useAdminEventsDashboard();
 * const { total_events, upcoming_events, past_events, draft_events } = data?.data || {};
 */
export const useAdminEventsDashboard = (options = {}) => {
  return useQuery({
    queryKey: adminKeys.eventsDashboard(),
    queryFn: adminService.getEventsDashboard,
    staleTime: 2 * 60 * 1000,
    retry: false,
    ...options,
  });
};

/**
 * Hook to fetch all events
 * Endpoint: GET /admin/events
 *
 * Returns: array of events with full details (id, title, category, image_url, event_date, etc.)
 *
 * @example
 * const { data, isLoading, error } = useAdminEvents();
 * const events = data?.data || [];
 */
export const useAdminEvents = (options = {}) => {
  return useQuery({
    queryKey: adminKeys.events(),
    queryFn: adminService.getEvents,
    staleTime: 3 * 60 * 1000,
    retry: false,
    ...options,
  });
};

/**
 * Hook to create a new event
 * Endpoint: POST /admin/events
 *
 * @example
 * const createEvent = useCreateEvent();
 *
 * createEvent.mutate({
 *   title: "NACOS Freshers Orientation '26",
 *   category: "Orientation",
 *   event_date: "2026-02-14",
 *   time_range: "10:00 AM - 2:00 PM",
 *   location: "University Auditorium",
 *   description: "Welcome event for freshers",
 *   image_url: "https://...",
 *   button_text: "Register Now",
 *   registration_link: "https://...",
 *   is_sold_out: 0
 * });
 */
export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createEvent,
    onSuccess: (data) => {
      console.log("Event created successfully:", data);
      // Invalidate both events list and dashboard metrics
      queryClient.invalidateQueries({ queryKey: adminKeys.events() });
      queryClient.invalidateQueries({ queryKey: adminKeys.eventsDashboard() });
    },
    onError: (error) => {
      console.error("Failed to create event:", error);
    },
  });
};

/**
 * Hook to update an existing event
 * Endpoint: PUT /admin/events/update?id={event_id}
 *
 * @example
 * const updateEvent = useUpdateEvent();
 *
 * updateEvent.mutate({
 *   id: 1,
 *   payload: {
 *     title: "Updated Title",
 *     category: "Workshop",
 *     ...
 *   }
 * });
 */
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.updateEvent,
    onSuccess: (data) => {
      console.log("Event updated successfully:", data);
      // Invalidate both events list and dashboard metrics
      queryClient.invalidateQueries({ queryKey: adminKeys.events() });
      queryClient.invalidateQueries({ queryKey: adminKeys.eventsDashboard() });
    },
    onError: (error) => {
      console.error("Failed to update event:", error);
    },
  });
};

/**
 * Hook to delete an event
 * Endpoint: DELETE /admin/events/delete?id={event_id}
 *
 * @example
 * const deleteEvent = useDeleteEvent();
 *
 * deleteEvent.mutate(1); // event id
 */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.deleteEvent,
    onSuccess: (data) => {
      console.log("Event deleted successfully:", data);
      // Invalidate both events list and dashboard metrics
      queryClient.invalidateQueries({ queryKey: adminKeys.events() });
      queryClient.invalidateQueries({ queryKey: adminKeys.eventsDashboard() });
    },
    onError: (error) => {
      console.error("Failed to delete event:", error);
    },
  });
};
