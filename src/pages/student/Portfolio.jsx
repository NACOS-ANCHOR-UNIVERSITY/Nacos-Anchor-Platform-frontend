import { useMemo, useRef, useState } from "react";
import { Pencil, Eye, Github, Linkedin, Globe, Upload, X } from "lucide-react";

function Card({ title, right, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
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

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-emerald-700" : "bg-slate-300"
      }`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SkillPill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full px-1 hover:bg-emerald-100"
        aria-label="remove"
      >
        ×
      </button>
    </span>
  );
}

export default function Portfolio() {
  const user = useMemo(
    () => ({
      fullName: "Adefemi Oluwatobi",
      deptLevel: "Computer Science | 400 Level",
      matric: "AUL/CPM/22/003",
    }),
    []
  );

  // avatar
  const avatarInputRef = useRef(null);
  const DEFAULT_AVATAR ="https://api.dicebear.com/7.x/avataaars/svg?seed=portfolio";
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

  const PROJECT_IMAGES = {
        library:
            "https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1200&auto=format&fit=crop",
        data:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    };


  // about me editing
  const [about, setAbout] = useState(
    "I am a passionate Computer Science student with a strong focus on Full Stack Development and Artificial Intelligence. I love building tools that solve real-world problems. Currently serving as the General Secretary for NACOS Anchor University Chapter. Always eager to learn new technologies and collaborate on open-source projects."
  );
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [aboutDraft, setAboutDraft] = useState(about);

  // skills (add works)
  const [skills, setSkills] = useState([
    "Python",
    "React JS",
    "Node.js",
    "UI/UX Design",
    "Data Analysis",
  ]);
  const [skillInput, setSkillInput] = useState("");

  function addSkill() {
    const v = skillInput.trim();
    if (!v) return;
    if (skills.some((s) => s.toLowerCase() === v.toLowerCase())) {
      setSkillInput("");
      return;
    }
    setSkills((p) => [...p, v]);
    setSkillInput("");
  }

  // social presence
  const [social, setSocial] = useState({
    github: "github.com/adefemioluwatobi",
    linkedin: "",
    portfolio: "",
  });

  // resume upload
  const resumeInputRef = useRef(null);
  const [resume, setResume] = useState({ name: "John_Doe_CV_2024.pdf" });

  function pickResume() {
    resumeInputRef.current?.click();
  }
  function onResumeChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setResume({ name: file.name });
  }
  function removeResume() {
    setResume(null);
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  }

  // projects (mock)
    const projects = [
        {
            id: 1,
            title: "University Library App",
            desc:
            "A comprehensive MERN stack application designed to digitize the university library...",
            tags: ["REACT", "MONGODB"],
            image: PROJECT_IMAGES.library,
        },
        {
            id: 2,
            title: "Python Data Scraper",
            desc:
            "Automated tool built with Beautiful Soup and Selenium to collect real-time housing data for...",
            tags: ["PYTHON", "SELENIUM"],
            image: PROJECT_IMAGES.data,
        },
        
    ];
    

  return (
    <div className="max-w-6xl">
      {/* Header (breadcrumb + title + subtitle + button) */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="text-xs text-slate-500">
            Dashboard <span className="mx-1">/</span>{" "}
            <span className="font-medium text-emerald-700">My Portfolio</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">My Portfolio</h1>
          <p className="mt-1 text-sm text-slate-600">
            Manage your profile visibility, skills, and showcase your best projects.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800"
        >
          <Eye className="h-4 w-4" />
          Preview Public Profile
        </button>
      </div>

      {/* Main grid (matches screenshot proportions) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="space-y-6">
          {/* Profile card */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                    <img
                        src={avatarUrl}
                        alt="profile avatar"
                        className="h-full w-full object-cover"
                    />

                </div>

                {/* edit avatar */}
                <button
                  type="button"
                  onClick={pickAvatar}
                  className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-emerald-700 text-white shadow hover:bg-emerald-800"
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
                <div className="text-base font-bold text-slate-900">{user.fullName}</div>
                <div className="text-xs font-semibold text-emerald-700">
                  {user.deptLevel}
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  Matric No: {user.matric}
                </div>
              </div>
            </div>

            {/* Public visibility block (with subtext + toggle like screenshot) */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">Public Visibility</div>
                  <div className="text-[11px] text-slate-500">Visible to employers</div>
                </div>
                <Toggle checked={isPublic} onChange={setIsPublic} />
              </div>
            </div>
          </Card>

          {/* Social Presence (with icons) */}
          <Card
            title="Social Presence"
            right={
              <button type="button" className="text-xs font-semibold text-emerald-700">
                Save
              </button>
            }
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Github className="h-4 w-4 text-slate-600" />
                <input
                  value={social.github}
                  onChange={(e) => setSocial((p) => ({ ...p, github: e.target.value }))}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="github.com/username"
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Linkedin className="h-4 w-4 text-slate-600" />
                <input
                  value={social.linkedin}
                  onChange={(e) => setSocial((p) => ({ ...p, linkedin: e.target.value }))}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="LinkedIn URL"
                />
              </div>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Globe className="h-4 w-4 text-slate-600" />
                <input
                  value={social.portfolio}
                  onChange={(e) => setSocial((p) => ({ ...p, portfolio: e.target.value }))}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Portfolio Website"
                />
              </div>
            </div>
          </Card>

          {/* Resume / CV */}
          <Card title="Resume / CV">
            <p className="text-xs text-slate-600">Upload a PDF version of your resume.</p>

            <div className="mt-3 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <div className="flex flex-col items-center text-center">
                <button
                  type="button"
                  onClick={pickResume}
                  className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <Upload className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={pickResume}
                  className="mt-3 text-sm font-semibold text-slate-900"
                >
                  Click to upload
                </button>
                <div className="text-[11px] text-slate-500">PDF max 5MB</div>

                <input
                  ref={resumeInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={onResumeChange}
                />
              </div>
            </div>

            {resume ? (
              <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-rose-50 text-rose-600 text-xs font-bold">
                    PDF
                  </span>
                  <div className="text-xs font-semibold text-slate-800">{resume.name}</div>
                </div>
                <button
                  type="button"
                  onClick={removeResume}
                  className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                  aria-label="remove resume"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : null}
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          {/* About Me (editable like screenshot) */}
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
              <p className="text-sm leading-relaxed text-slate-700">{about}</p>
            ) : (
              <div className="space-y-3">
                <textarea
                  value={aboutDraft}
                  onChange={(e) => setAboutDraft(e.target.value)}
                  className="min-h-[110px] w-full rounded-lg border border-slate-200 bg-white p-3 text-sm outline-none focus:border-emerald-300"
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
                    onClick={() => {
                      setAbout(aboutDraft);
                      setIsEditingAbout(false);
                    }}
                    className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </Card>

          {/* Skills (add skill works like screenshot) */}
          <Card
            title="Skills"
            right={
              <button
                type="button"
                onClick={addSkill}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                + Add Skill
              </button>
            }
          >
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <SkillPill
                  key={s}
                  label={s}
                  onRemove={() => setSkills((p) => p.filter((x) => x !== s))}
                />
              ))}
            </div>

            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-300"
              placeholder="Type a skill..."
            />
          </Card>

          {/* Featured Projects */}
          <div>
            <div className="mb-3 text-sm font-semibold text-slate-800">Featured Projects</div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {projects.map((p) => (
                <div key={p.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                  <img
  src={p.image}
  alt={p.title}
  className="h-36 w-full object-cover"
  loading="lazy"
  onError={(e) => {
    // fallback if the image URL fails for any reason
    e.currentTarget.style.display = "none";
  }}
/>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{p.title}</div>
                        <div className="mt-1 text-xs text-slate-600">{p.desc}</div>
                      </div>
                      <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800">
                        View Project →
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Project (dashed box like screenshot) */}
              <button
                type="button"
                className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-center hover:bg-slate-100"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700">
                  +
                </div>
                <div className="mt-3 text-sm font-semibold text-slate-900">Add New Project</div>
                <div className="mt-1 text-xs text-slate-500">Showcase your latest work</div>
              </button>
            </div>
          </div>

          <div className="pt-8 text-center text-[11px] text-slate-400">
            © 2024 NACOS Anchor University. All rights reserved.
          </div>
        </div>
      </div>
    </div>
    
  );
}
