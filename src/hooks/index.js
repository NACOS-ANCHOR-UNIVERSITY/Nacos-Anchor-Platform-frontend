/**
 * Central export for custom hooks
 * 
 * Assigned Endpoints:
 * - Student Payment & Receipt: GET /finance/dashboard
 * - For Siwes: GET /siwes/list
 * - Admin Finance Dashboard: GET /admin/payments
 * - Admin SIWES Board: GET /admin/siwes, POST /admin/siwes
 * 
 * Usage:
 * import { useFinanceDashboard, useOpportunities, useAdminPayments } from '@/hooks';
 */

// Finance hooks (Student Payment & Receipt)
export {
  useFinanceDashboard,
  financeKeys,
} from './useFinance';

// SIWES hooks (Student SIWES List)
export {
  useOpportunities,
  siwesKeys,
} from './useSiwes';

// Admin hooks (Admin Finance Dashboard & SIWES Board)
export {
  useAdminPayments,
  useAdminSiwesBoard,
  useCreateOpportunity,
  adminKeys,
} from './useAdmin';
