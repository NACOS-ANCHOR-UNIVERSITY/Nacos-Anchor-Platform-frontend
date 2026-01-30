import apiClient from "./apiClient";

export const studentService = {
  // --- CONTACT & EVENTS ---
  submitContact: (data) => apiClient.post("/contact/submit", data),
  getEvents: () => apiClient.get("/contact/events-list"),

  // --- LIBRARY ---
  getLibraryResources: (params) => apiClient.get("/resources/library", { params }), // params can be { level: 100, search: 'java' }
  uploadResource: (formData) => apiClient.post("/upload/submit", formData),

  // --- FINANCE ---
  getDashboardFinance: () => apiClient.get("/finance/dashboard"),

  // --- SIWES ---
  getSiwesList: () => apiClient.get("/swies/list"),

  // --- PORTFOLIO ---
  getPortfolio: () => apiClient.get("/portfolio/me"),
  updateBio: (data) => apiClient.put("/portfolio/about", data),
  toggleVisibility: (data) => apiClient.put("/portfolio/visibility", data), // { public_visibility: 1 }
  updateSocials: (data) => apiClient.put("/portfolio/socials", data),

  // Skills
  getSkills: () => apiClient.get("/portfolio/skills"),
  addSkill: (data) => apiClient.post("/portfolio/skills", data),
  deleteSkill: (id) => apiClient.delete(`/portfolio/skills/${id}`),

  // Projects
  getProjects: () => apiClient.get("/portfolio/projects"),
  addProject: (formData) => apiClient.post("/portfolio/projects", formData),
  deleteProject: (id) => apiClient.delete(`/portfolio/projects/${id}`),

  // Resume
  uploadResume: (formData) => apiClient.post("/portfolio/resume", formData),

  // Public View
  getPublicProfile: (matricNumber) => apiClient.get(`/profile/${matricNumber}`),
};