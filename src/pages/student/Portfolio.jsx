import { useEffect, useRef, useState } from "react";
import {
  Linkedin,
  X,
  Upload,
  FileText,
  Github,
  Globe,
  Eye,
  Pencil,
  Plus,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
  getPortfolioData,
  toggleVisibility,
  updateAbout,
  addSkill,
  deleteSkill,
  updateSocials,
  uploadResume,
  addProject,
  uploadProfilePicture,
} from "@/features/student/portfolio/api";

// Constants for Media
const MEDIA_BASE_URL = "https://nacos.nextgenerationones.org/api";
const DEFAULT_AVATAR =
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Student";
const DEFAULT_PROJECT_IMG =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop";

function Card({ title, right, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {title && (
        <div className="flex items-center justify-between px-5 pt-5">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {right}
        </div>
      )}
      <div className={title ? "px-5 pb-5 pt-3" : "p-5"}>{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-brand-primary" : "bg-slate-300"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block size-5 transform rounded-full bg-white transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SkillPill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,white)] bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] px-3 py-1 text-xs font-medium text-brand-primary">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full px-1 hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_15%,white)]"
        aria-label="remove"
      >
        &times;
      </button>
    </span>
  );
}

function ProjectModal({ isOpen, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_url: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ title: "", description: "", project_url: "" });
      setImage(null);
      setImagePreview(null);
      setLoading(false);
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setImage(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast.error("Title and description are required");
      return;
    }

    try {
      setLoading(true);
      const submissionData = new FormData();
      submissionData.append("title", formData.title);
      submissionData.append("description", formData.description);
      if (formData.project_url)
        submissionData.append("project_url", formData.project_url);
      if (image) submissionData.append("image", image);

      await onSave(submissionData);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-900">Add New Project</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Image Upload Area */}
          <div className="group relative">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-brand-primary hover:bg-slate-100"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-500">
                  <div className="rounded-full bg-white p-3 shadow-sm">
                    <ImageIcon className="size-6 text-brand-primary" />
                  </div>
                  <span className="mt-2 text-sm font-medium">
                    Click to upload cover image
                  </span>
                  <span className="text-xs text-slate-400">
                    Max 5MB (Optional)
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            {imagePreview && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute -right-2 -top-2 rounded-full border border-slate-100 bg-white p-1 shadow-md hover:bg-red-50 hover:text-red-500"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              placeholder="e.g. E-commerce Mobile App"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Project URL
            </label>
            <input
              type="url"
              value={formData.project_url}
              onChange={(e) =>
                setFormData({ ...formData, project_url: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              placeholder="Briefly describe the project stack and features..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
            >
              {loading && <Loader2 className="animate-spin size-4" />}
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [user, setUser] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [social, setSocial] = useState({
    github: "",
    linkedin: "",
    portfolio: "",
  });
  const [resume, setResume] = useState(null);
  const [projects, setProjects] = useState([]);

  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutDraft, setAboutDraft] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  const resumeInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  // to ensure urls are absolute
  const getAbsoluteUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    return `${MEDIA_BASE_URL}/${path.replace(/^\/+/, "")}`;
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getPortfolioData();

      const u = data.user;
      setUser({
        fullName:
          `${u?.last_name || ""} ${u?.first_name || ""}`.trim() || "Student",
        deptLevel: u?.department || "Computer Science",
        matric: u?.matric_no || "N/A",
        avatar: getAbsoluteUrl(u?.profile_picture) || DEFAULT_AVATAR,
      });

      setIsPublic(!!u?.public_visibility);
      setAbout(u?.bio || "No bio added yet.");
      setPublicUrl(data.public_profile_url || "");
      setSkills(data.skills || []);

      setSocial({
        github: u?.github_url || "",
        linkedin: u?.linkedin_url || "",
        portfolio: u?.portfolio_url || "",
      });

      setProjects(data.projects || []);

      const resumePath = u?.resume_url || u?.resume;
      if (resumePath) {
        setResume({
          name: "My Resume",
          url: getAbsoluteUrl(resumePath),
        });
      }
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
      toast.error("Failed to load portfolio data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVisibility = async (newStatus) => {
    setIsPublic(newStatus);
    try {
      await toggleVisibility(newStatus);
      toast.success(`Profile visibility turned ${newStatus ? "ON" : "OFF"}`);
    } catch (error) {
      setIsPublic(!newStatus);
      console.error(error || "Failed to toggle visibility");
      toast.error("Failed to toggle visibility");
    }
  };

  const handleSaveAbout = async () => {
    try {
      setIsSaving(true);
      await updateAbout(aboutDraft);
      setAbout(aboutDraft);
      setIsEditingAbout(false);
      toast.success("Bio updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update bio");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSocials = async () => {
    try {
      setIsSaving(true);
      await updateSocials(social);
      toast.success("Social links updated!");
    } catch (error) {
      console.error(error || "Failed to update socials");
      toast.error("Failed to update socials");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSkill = async () => {
    const v = skillInput.trim();
    if (!v) return;

    try {
      setSkillInput("");
      const newSkill = await addSkill(v);
      setSkills((prev) => [...prev, newSkill.data || newSkill]);
    } catch (error) {
      console.error(error || "Failed to add skill");
      toast.error("Failed to add skill");
    }
  };

  const handleRemoveSkill = async (id) => {
    try {
      setSkills((prev) => prev.filter((s) => s.id !== id));
      await deleteSkill(id);
    } catch (error) {
      console.error(error || "Failed to delete skill");
      toast.error("Failed to delete skill");
      fetchData(); // Reload to sync
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max 5MB.");
      return;
    }

    try {
      setIsSaving(true);
      await uploadResume(file);
      // We assume backend processing is fast, but locally previewing it
      setResume({ name: file.name, url: URL.createObjectURL(file) });
      toast.success("Resume uploaded successfully");
    } catch (error) {
      console.error(error || "Upload failed");
      toast.error("Failed to upload resume");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateProject = async (formData) => {
    try {
      const response = await addProject(formData);
      setProjects((prev) => [...prev, response.data || response]);
      toast.success("Project added successfully!");
    } catch (error) {
      console.error("Failed to add project", error);
      toast.error("Failed to create project");
      throw error;
    }
  };

  const onAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only jpg, jpeg, png, webp allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Max 5MB allowed.");
      return;
    }

    setIsAvatarUploading(true);
    try {
      const response = await uploadProfilePicture(file);

      if (response.status === "success" && response.data?.avatar_url) {
        // Construct full URL since response is likely relative ("uploads/...")
        const fullUrl = getAbsoluteUrl(response.data.avatar_url);
        setUser((prev) => ({ ...prev, avatar: fullUrl }));
        toast.success("Profile picture updated successfully");
      } else {
        toast.error(response.message || "Failed to update profile picture");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile picture");
    } finally {
      setIsAvatarUploading(false);
    }
  };

  const handlePreviewProfile = () => {
    if (isPublic && publicUrl) {
      window.open(publicUrl, "_blank");
    } else {
      toast.error("Please turn on visibility to view public profile.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Loader2 className="animate-spin text-brand-primary size-8" />
      </div>
    );
  }

  return (
    <div>
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleCreateProject}
      />

      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Portfolio
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage your profile visibility, skills, and showcase your best
            projects.
          </p>
        </div>

        <button
          type="button"
          onClick={handlePreviewProfile}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition ${
            isPublic
              ? "bg-brand-primary hover:opacity-95"
              : "cursor-not-allowed bg-slate-300"
          }`}
        >
          <Eye className="h-4 w-4" />
          Preview Public Profile
        </button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Profile card */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <div className="size-24 overflow-hidden rounded-full border border-slate-200 bg-slate-100 relative">
                  <img
                    src={user?.avatar}
                    alt="profile avatar"
                    className="h-full w-full object-cover"
                  />
                  {/* Loading Overlay */}
                  {isAvatarUploading && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Loader2 className="size-6 text-white animate-spin" />
                    </div>
                  )}
                </div>

                {/* Edit avatar trigger */}
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-brand-primary text-white shadow-md border-2 border-white hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
                  title="Edit photo"
                  disabled={isAvatarUploading}
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  onChange={onAvatarChange}
                  disabled={isAvatarUploading}
                />
              </div>

              <div className="mt-4">
                <div className="text-lg font-bold text-slate-900">
                  {user?.fullName}
                </div>
                <div className="text-sm font-semibold text-brand-primary">
                  {user?.deptLevel}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Matric No: {user?.matric}
                </div>
              </div>
            </div>

            {/* Public visibility */}
            <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Public Visibility
                  </div>
                  <div className="text-xs text-slate-500">
                    Visible to employers
                  </div>
                </div>
                <Toggle checked={isPublic} onChange={handleToggleVisibility} />
              </div>
            </div>
            {isPublic && publicUrl && (
              <div className="mt-3 text-center">
                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-brand-primary hover:underline break-all"
                >
                  {publicUrl}
                </a>
              </div>
            )}
          </Card>

          {/* Social Presence */}
          <Card
            title="Social Presence"
            right={
              <button
                type="button"
                onClick={handleSaveSocials}
                disabled={isSaving}
                className="text-xs font-semibold text-brand-primary disabled:opacity-50 hover:underline"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            }
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Github className="h-4 w-4 text-slate-600" />
                <input
                  value={social.github}
                  onChange={(e) =>
                    setSocial((p) => ({ ...p, github: e.target.value }))
                  }
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="github.com/username"
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Linkedin className="size-4 text-slate-600" />
                <input
                  value={social.linkedin}
                  onChange={(e) =>
                    setSocial((p) => ({ ...p, linkedin: e.target.value }))
                  }
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="LinkedIn URL"
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Globe className="h-4 w-4 text-slate-600" />
                <input
                  value={social.portfolio}
                  onChange={(e) =>
                    setSocial((p) => ({ ...p, portfolio: e.target.value }))
                  }
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Portfolio Website"
                />
              </div>
            </div>
          </Card>

          {/* Resume / CV */}
          <Card title="Resume / CV">
            <p className="text-xs text-slate-600">
              Upload a PDF version of your resume.
            </p>

            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-white p-5">
              <div className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  disabled={isSaving}
                  className="grid size-10 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-white disabled:opacity-50 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className="mt-3 text-sm font-semibold text-slate-900 hover:underline"
                >
                  {isSaving ? "Uploading..." : "Click to upload"}
                </button>
                <div className="text-[11px] text-slate-500">PDF max 5MB</div>

                <input
                  ref={resumeInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleResumeChange}
                />
              </div>
            </div>

            {resume ? (
              <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="h-5 w-5 shrink-0 text-red-500" />
                  <a
                    href={resume.url}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate text-xs font-semibold text-slate-800 hover:text-brand-primary hover:underline"
                  >
                    {resume.name}
                  </a>
                </div>
              </div>
            ) : null}
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 lg:col-span-2">
          {/* About Me */}
          <Card
            title="About Me"
            right={
              <button
                type="button"
                onClick={() => {
                  setAboutDraft(about);
                  setIsEditingAbout(true);
                }}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="edit about"
              >
                <Pencil className="h-4 w-4" />
              </button>
            }
          >
            {!isEditingAbout ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {about}
              </p>
            ) : (
              <div className="space-y-3">
                <div className="relative">
                  <textarea
                    value={aboutDraft}
                    onChange={(e) => {
                      if (e.target.value.length <= 500)
                        setAboutDraft(e.target.value);
                    }}
                    maxLength={500}
                    className="min-h-30 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 bg-white px-1">
                    {aboutDraft.length}/500
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingAbout(false)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAbout}
                    disabled={isSaving}
                    className="rounded-lg bg-brand-primary px-3 py-2 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* Skills */}
          <Card
            title="Skills"
            right={
              <button
                type="button"
                onClick={handleAddSkill}
                className="text-xs font-semibold text-brand-primary hover:opacity-90 hover:underline"
              >
                + Add Skill
              </button>
            }
          >
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <SkillPill
                  key={s.id || s.skill}
                  label={s.skill}
                  onRemove={() => handleRemoveSkill(s.id)}
                />
              ))}
            </div>

            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-primary"
              placeholder="Type a skill and press Enter..."
            />
          </Card>

          {/* Projects */}
          <div>
            <div className="mb-3 text-sm font-semibold text-slate-800">
              Featured Projects
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {projects.length === 0 && (
                <div className="col-span-full py-10 text-center text-sm text-slate-500 border border-dashed border-slate-200 rounded-xl bg-slate-50">
                  No projects added yet.
                </div>
              )}

              {projects.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white group hover:shadow-md transition-shadow"
                >
                  <div className="h-36 w-full overflow-hidden bg-slate-100">
                    <img
                      src={
                        getAbsoluteUrl(p.image_url || p.image) ||
                        DEFAULT_PROJECT_IMG
                      }
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900 line-clamp-1">
                          {p.title}
                        </div>
                        <div className="mt-1 line-clamp-2 text-xs text-slate-600">
                          {p.description}
                        </div>
                      </div>
                      {p.project_url && (
                        <a
                          href={p.project_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-brand-primary hover:opacity-90 shrink-0 hover:underline"
                        >
                          View
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Project  */}
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(true)}
                className="flex min-h-30 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center transition-colors hover:bg-slate-100"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
                  <Plus className="h-5 w-5 text-slate-600" />
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  Add New Project
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

