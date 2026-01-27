import { useQuery } from "@tanstack/react-query";
import { siwesService } from "../services";

/**
 * Query key factory for SIWES
 * Used for: Student SIWES Opportunities List
 */
export const siwesKeys = {
  all: ["siwes"],
  opportunities: () => [...siwesKeys.all, "opportunities"],
};

/**
 * Hook to get all SIWES opportunities
 * Endpoint: GET /siwes/list
 * 
 * Returns: count and data array with opportunities
 * Each opportunity has: id, company_name, role_title, location, category,
 *                       duration, requirements, tags, status, is_featured,
 *                       application_link, posted_at, posted_text
 * 
 * @example
 * const { data, isLoading, error } = useOpportunities();
 * const opportunities = data?.data || [];
 */
export const useOpportunities = (options = {}) => {
  return useQuery({
    queryKey: siwesKeys.opportunities(),
    queryFn: siwesService.getOpportunities,
    staleTime: 3 * 60 * 1000, // 3 minutes
    ...options,
  });
};
