import client from "../config/axios-client";

/**
 * SIWES Service - Student SIWES Opportunities List
 * 
 * Endpoint: GET /siwes/list
 * 
 * Response Structure:
 * {
 *   status: "success",
 *   count: 10,
 *   data: [
 *     {
 *       id: 2,
 *       company_name: "MainOne Cables",
 *       role_title: "Network Administrator Intern",
 *       location: "Victoria Island, Lagos",
 *       category: "Networking",
 *       duration: "1 Year",
 *       requirements: null,
 *       tags: ["Cisco", "Troubleshooting"],
 *       status: "Active",
 *       is_featured: 1,
 *       application_link: "#",
 *       posted_at: "2025-12-29 08:11:28",
 *       posted_text: "Posted 5 days ago"
 *     }
 *   ]
 * }
 */

export const siwesService = {
  /**
   * Get all SIWES opportunities list
   * @returns {Promise} - API response with opportunities list
   */
  getOpportunities: async () => {
    const response = await client.get("/siwes/list");
    return response.data;
  },
};

export default siwesService;
