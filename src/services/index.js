/**
 * Central export for API services
 * 
 * Assigned Endpoints:
 * - Student Payment & Receipt: GET /finance/dashboard
 * - For Siwes: GET /siwes/list
 * - Admin Finance Dashboard: GET /admin/payments
 * - Admin SIWES Board: GET /admin/siwes, POST /admin/siwes
 * 
 * Usage:
 * import { financeService, siwesService, adminService } from '@/services';
 */

export { default as financeService } from './financeService';
export { default as siwesService } from './siwesService';
export { default as adminService } from './adminService';
