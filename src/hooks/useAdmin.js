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
