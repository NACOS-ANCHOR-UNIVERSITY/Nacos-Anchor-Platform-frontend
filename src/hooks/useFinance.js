import { useQuery } from "@tanstack/react-query";
import { financeService } from "../services";

/**
 * Query key factory for finance
 * Used for: Student Payment and Receipt
 */
export const financeKeys = {
  all: ["finance"],
  dashboard: () => [...financeKeys.all, "dashboard"],
};

/**
 * Hook to get student finance dashboard data
 * Endpoint: GET /finance/dashboard
 * 
 * Returns: overview (total_paid, outstanding, wallet_balance, currency),
 *          pending_fees array, and history array
 * 
 * @example
 * const { data, isLoading, error } = useFinanceDashboard();
 * const { overview, pending_fees, history } = data?.data || {};
 */
export const useFinanceDashboard = (options = {}) => {
  return useQuery({
    queryKey: financeKeys.dashboard(),
    queryFn: financeService.getDashboard,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};
