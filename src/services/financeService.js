import client from "../config/axios-client";

/**
 * Finance Service - Student Payment and Receipt
 * 
 * Endpoint: GET /finance/dashboard
 * 
 * Response Structure:
 * {
 *   status: "success",
 *   data: {
 *     overview: {
 *       total_paid: "5,500",
 *       outstanding: "2,000",
 *       wallet_balance: "1,200",
 *       currency: "₦"
 *     },
 *     pending_fees: [
 *       {
 *         id: 1,
 *         title: "Departmental Dues",
 *         description: "Annual departmental levy...",
 *         amount: "2000.00",
 *         type: "Compulsory",
 *         button_text: "Pay Now",
 *         status_badge: "PENDING",
 *         created_at: "2026-01-03 08:42:35"
 *       }
 *     ],
 *     history: [
 *       {
 *         id: 1,
 *         reference_id: "REF-8839210",
 *         user_id: 1,
 *         description: "Fresher's Dues",
 *         amount: "3000.00",
 *         status: "Successful",
 *         date_paid: "2023-10-24",
 *         receipt_link: "#",
 *         formatted_date: "Oct 24, 2023"
 *       }
 *     ]
 *   }
 * }
 */

export const financeService = {
  /**
   * Get student finance dashboard data
   * Includes overview, pending fees, and payment history
   * @returns {Promise} - API response with finance dashboard data
   */
  getDashboard: async () => {
    const response = await client.get("/finance/dashboard");
    return response.data;
  },
};

export default financeService;
