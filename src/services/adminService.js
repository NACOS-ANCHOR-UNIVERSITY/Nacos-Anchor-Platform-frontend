import client from "../config/axios-client";

/**
 * Admin Service - Admin Finance Dashboard & SIWES Board
 */

export const adminService = {
  // ===== ADMIN FINANCE DASHBOARD =====

  /**
   * Get admin payments dashboard
   * Endpoint: GET /admin/payments
   * 
   * Response Structure:
   * {
   *   status: "success",
   *   data: {
   *     metrics: {
   *       total_revenue: "₦ 4,500,500",
   *       pending_approvals: 2,
   *       approved_receipts: 6,
   *       verification_rate: "60%"
   *     },
   *     transactions: [
   *       {
   *         id: 1,
   *         reference_id: "REF-8839210",
   *         description: "Fresher's Dues",
   *         amount: "3000.00",
   *         status: "Successful",
   *         date_paid: "2023-10-24",
   *         full_name: "My Student Account",
   *         matric_no: "19/2023/001",
   *         avatar_url: "/assets/default-avatar.png",
   *         formatted_date: "Oct 24, 2023",
   *         formatted_amount: "₦ 3,000"
   *       }
   *     ]
   *   }
   * }
   */
  getPayments: async () => {
    const response = await client.get("/admin/payments");
    return response.data;
  },

  // ===== ADMIN SIWES BOARD =====

  /**
   * Get admin SIWES board data
   * Endpoint: GET /admin/siwes
   * 
   * Response Structure:
   * {
   *   status: "success",
   *   data: {
   *     metrics: {
   *       active_opportunities: 10,
   *       pending_logs: 4,
   *       placed_students: 128
   *     },
   *     moderation_queue: [
   *       {
   *         id: 3,
   *         student_name: "Emmanuel T.",
   *         student_dept: "400L - Computer Science",
   *         type: "Logbook",
   *         title: "Week 4 Logbook",
   *         description: "Uploaded weekly report for review.",
   *         status: "Pending",
   *         time_ago: "2h ago",
   *         created_at: "2026-01-03 08:57:42"
   *       }
   *     ],
   *     listings: [
   *       {
   *         id: 1,
   *         company_name: "Paystack",
   *         role_title: "Frontend Developer Intern",
   *         location: "Ikeja, Lagos (Hybrid)",
   *         category: "Software Dev",
   *         duration: "6 Months",
   *         requirements: null,
   *         tags: "React, TypeScript",
   *         status: "Active",
   *         is_featured: 0,
   *         application_link: "#",
   *         posted_at: "2026-01-01 08:11:28",
   *         is_active: 1,
   *         formatted_date: "Jan 01, 2026"
   *       }
   *     ]
   *   }
   * }
   */
  getSiwesBoard: async () => {
    const response = await client.get("/admin/siwes");
    return response.data;
  },

  /**
   * Post a new SIWES opportunity
   * Endpoint: POST /admin/siwes
   * 
   * @param {Object} data - Opportunity data
   * @param {string} data.company_name - Company name (e.g., "MTN Nigeria")
   * @param {string} data.role_title - Role title (e.g., "Data Analyst Intern")
   * @param {string} data.location - Location (e.g., "Ikoyi, Lagos")
   * @param {string} data.duration - Duration (e.g., "6 Months")
   * @param {string} data.requirements - Requirements (e.g., "SQL, Excel, Python")
   * 
   * @returns {Promise} - API response
   * 
   * Success Response:
   * {
   *   status: "success",
   *   message: "Opportunity Posted Successfully"
   * }
   */
  createOpportunity: async (data) => {
    const response = await client.post("/admin/siwes", data);
    return response.data;
  },
};

export default adminService;
