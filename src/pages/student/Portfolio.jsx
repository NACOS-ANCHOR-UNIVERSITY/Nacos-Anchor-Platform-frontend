import { useEffect, useMemo, useRef, useState } from "react";
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
} from "lucide-react";

// Placeholder images for projects (replace with actual images when available)
const projectLibraryImg =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop";
const projectScraperImg =
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop";

import {
  getPortfolioData,
  toggleVisibility,
  updateAbout,
  addSkill,
  deleteSkill,
  updateSocials,
  uploadResume,
} from "@/features/student/portfolio/api";
import { toast } from "sonner";

function Card({ title, right, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white h-full">
      {title ? (
        <div className="flex items-center justify-between px-5 pt-5">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          {right}
        </div>
      ) : null}
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
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
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
        ×
      </button>
    </span>
  );
}

export default function Portfolio() {
  const [user, setUser] = useState({
    fullName: "Adefemi Oluwatobi",
    deptLevel: "Computer Science | 400 Level",
    matric: "AUL/CPM/22/003",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");

  // avatar
  const avatarInputRef = useRef(null);
  const DEFAULT_AVATAR =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio";
  const [avatarUrl, setAvatarUrl] = useState(DEFAULT_AVATAR);

  function pickAvatar() {
    avatarInputRef.current?.click();
  }
  function onAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  }

  // public visibility
  const [isPublic, setIsPublic] = useState(true);

  // about me editing
  const [about, setAbout] = useState(
    "I am a passionate Computer Science student with a strong focus on Full Stack Development and Artificial Intelligence. I love building tools that solve real-world problems. Currently serving as the General Secretary for NACOS Anchor University Chapter. Always eager to learn new technologies and collaborate on open-source projects.",
  );
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutDraft, setAboutDraft] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [social, setSocial] = useState({
    github: "",
    linkedin: "",
    portfolio: "",
  });
  const resumeInputRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getPortfolioData();

      setUser({
        fullName: `${data.user?.last_name || ""} ${data.user?.first_name || ""}`,
        deptLevel: "Computer Science",
        matric: data.user?.matric_number,
        avatar:
          data.user?.avatar ||
          "https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio",
      });

      setIsPublic(!!data.user?.public_visibility);
      setAbout(data.user?.bio || "No bio added yet.");
      setPublicUrl(data.public_profile_link);
      setSkills(data.skills || []);
      setSocial({
        github: data.user?.github_url || "",
        linkedin: data.user?.linkedin_url || "",
        portfolio: data.user?.portfolio_url || "",
      });

      setProjects(data.projects || []);

      if (data.user?.resume_url) {
        setResume({ name: "Uploaded Resume", url: data.user.resume_url });
      }
    } catch (error) {
      console.error("Failed to fetch portfolio", error);
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
    }
  };

  const handleSaveAbout = async () => {
    try {
      setIsSaving(true);
      await updateAbout(aboutDraft);
      setAbout(aboutDraft);
      setIsEditingAbout(false);
    } catch (error) {
      console.error(error || "Failed to update bio");
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
      fetchData();
    }
  };

  const handleResumeChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max 5MB.");
      return;
    }

    try {
      setIsSaving(true);
      await uploadResume(file);
      setResume({ name: file.name });
      toast.success("Resume uploaded successfully");
    } catch (error) {
      console.error(error || "Upload failed");
      toast.error("Failed to upload resume");
    } finally {
      setIsSaving(false);
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
        <Loader2 className="animate-spin text-brand-primary" />
      </div>
    );
  }

  return (
    <div>
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
              : "bg-slate-300 cursor-not-allowed"
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
              <div className="relative">
                <div className="size-20 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                  <img
                    src={user?.avatar}
                    alt="profile avatar"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* edit avatar */}
                <button
                  type="button"
                  onClick={pickAvatar}
                  className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-[var(--color-brand-primary)] text-white shadow hover:opacity-95"
                  title="Edit photo"
                >
                  <Pencil className="h-4 w-4" />
                </button>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onAvatarChange}
                />
              </div>

              <div className="mt-4">
                <div className="text-base font-bold text-slate-900">
                  {user?.fullName}
                </div>
                <div className="text-xs font-semibold text-brand-primary">
                  {user?.deptLevel}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Matric No: {user?.matric}
                </div>
              </div>
            </div>

            {/* Public visibility */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    Public Visibility
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Visible to employers
                  </div>
                </div>
                <Toggle checked={isPublic} onChange={handleToggleVisibility} />
              </div>
            </div>
            {isPublic && (
              <div className="mt-2 text-[10px] text-slate-400 break-all">
                {publicUrl}
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
                className="text-xs font-semibold text-brand-primary disabled:opacity-50"
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
                  className="w-full bg-transparent text-sm outline-none"
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
                  className="w-full bg-transparent text-sm outline-none"
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
                  className="w-full bg-transparent text-sm outline-none"
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
                  className="grid size-10 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 hover:bg-white disabled:opacity-50"
                >
                  <Upload className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => resumeInputRef.current?.click()}
                  className="mt-3 text-sm font-semibold text-slate-900"
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
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-red-500" />
                  <div className="text-xs font-semibold text-slate-800">
                    {resume.name}
                  </div>
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
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100"
                aria-label="edit about"
              >
                <Pencil className="h-4 w-4" />
              </button>
            }
          >
            {!isEditingAbout ? (
              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                {about}
              </p>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={aboutDraft}
                  onChange={(e) => setAboutDraft(e.target.value)}
                  className="min-h-27.5 w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-brand-primary"
                />
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
                className="text-xs font-semibold text-brand-primary hover:opacity-90"
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
              placeholder="Type a skill..."
            />
          </Card>

          {/* Projects */}
          <div>
            <div className="mb-3 text-sm font-semibold text-slate-800">
              Featured Projects
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {projects.length === 0 && (
                <div className="col-span-full py-8 text-center text-sm text-slate-500">
                  No projects added yet.
                </div>
              )}

              {projects.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <img
                    src={p.image_url || projectLibraryImg}
                    alt={p.title}
                    className="h-36 w-full object-cover"
                    loading="lazy"
                  />

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {p.title}
                        </div>
                        <div className="mt-1 text-xs text-slate-600 line-clamp-2">
                          {p.description}
                        </div>
                      </div>
                      {p.project_url && (
                        <a
                          href={p.project_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-semibold text-brand-primary hover:opacity-90"
                        >
                          View →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Project  */}
              <button
                type="button"
                onClick={() =>
                  toast("Project Form Modal to capture Title, Desc, and Image.")
                }
                className="flex min-h-55 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center hover:bg-slate-100"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full border border-slate-200 bg-slate-50">
                  <Plus className="h-5 w-5 text-slate-600" />
                </div>

                <div className="mt-3 text-sm font-semibold text-slate-900">
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
