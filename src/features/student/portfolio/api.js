import client from "@/config/axios-client";

export const getPortfolioData = async () => {
  const { data } = await client.get("/portfolio/me");
  return data;
};

export const updateAbout = async (bio) => {
  const { data } = await client.put("/portfolio/about", { bio });
  return data;
};

export const toggleVisibility = async (status) => {
  const payload = { public_visibility: status ? 1 : 0 };
  const { data } = await client.put("/portfolio/visibility", payload);
  return data;
};

export const updateSocials = async (socials) => {
  const payload = {
    github_url: socials.github,
    linkedin_url: socials.linkedin,
    portfolio_url: socials.portfolio,
  };
  const { data } = await client.put("/portfolio/socials", payload);
  return data;
};

export const addSkill = async (skillName) => {
  const { data } = await client.post("/portfolio/skills", { skill: skillName });
  return data;
};

export const deleteSkill = async (skillId) => {
  const { data } = await client.delete(`/portfolio/skills/${skillId}`);
  return data;
};

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await client.post("/portfolio/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

// need a form to capture these details...no UI
export const addProject = async (projectData) => {
  const formData = new FormData();
  formData.append("title", projectData.title);
  formData.append("description", projectData.description);
  if (projectData.project_url)
    formData.append("project_url", projectData.project_url);
  if (projectData.image) formData.append("image", projectData.image); // File object

  const { data } = await client.post("/portfolio/projects", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteProject = async (projectId) => {
  const { data } = await client.delete(`/portfolio/projects/${projectId}`);
  return data;
};

