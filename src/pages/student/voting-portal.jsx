import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import VotingLayout from "@/features/voting/components/VotingLayout";
import ProgressSidebar from "@/features/voting/components/ProgressSidebar";
import CandidateCard from "@/features/voting/components/CandidateCard";
import ManifestoModal from "@/features/voting/components/ManifestoModal";
import BallotSidebar from "@/features/voting/components/BallotSidebar";
import SuccessView from "@/features/voting/components/SuccessView";
import LiveStatsView from "@/features/voting/components/LiveStatsView";
import { ELECTION_ROLES, CANDIDATES } from "@/features/voting/mockData";

// Maps the activeNav label to which content to render
// "Home"       → voting flow (step-by-step)
// "Live Stats" → live election stats
// "My Ballot"  → success / confirmation (only after submitting)

const VotingPortal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Nav view: "Home" | "Live Stats" | "My Ballot"
  const [activeNav, setActiveNav] = useState("Home");

  // Manifesto modal
  const [manifestoCandidate, setManifestoCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mobile sidebar panels
  const [mobilePanel, setMobilePanel] = useState("main");

  const currentRole = ELECTION_ROLES[currentStep];
  const currentCandidates = CANDIDATES[currentRole?.id] || [];
  const selectedCandidateId = selections[currentRole?.id];
  const allVoted = Object.keys(selections).length === ELECTION_ROLES.length;

  // ── handlers ──────────────────────────────────────────────────────────────

  const handleSelectCandidate = (roleId, candidateId) => {
    setSelections((prev) => ({ ...prev, [roleId]: candidateId }));
  };

  const handleNext = () => {
    if (currentStep < ELECTION_ROLES.length - 1) setCurrentStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    if (!allVoted) return;
    setSubmitted(true);
    setActiveNav("My Ballot");
  };

  const handleOpenManifesto = (candidate) => {
    setManifestoCandidate(candidate);
    setIsModalOpen(true);
  };

  const handleCloseManifesto = () => {
    setIsModalOpen(false);
    setManifestoCandidate(null);
  };

  const handleNavChange = (label) => {
    // "My Ballot" is only accessible once votes are submitted
    if (label === "My Ballot" && !submitted) return;
    setActiveNav(label);
    // Close any open mobile panel when switching view
    setMobilePanel("main");
  };

  // ── decide what the main content renders ──────────────────────────────────

  const renderMainContent = () => {
    if (activeNav === "Live Stats") {
      return <LiveStatsView />;
    }

    if (activeNav === "My Ballot" && submitted) {
      return (
        <SuccessView
          roles={ELECTION_ROLES}
          selections={selections}
          onViewLiveStats={() => setActiveNav("Live Stats")}
        />
      );
    }

    // Default: "Home" — step-by-step voting flow
    return (
      <div className="flex flex-col h-full">
        {/* Category header */}
        <div className="px-5 pt-5 pb-3 border-b border-[#E2E8F0] bg-white">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <span className="text-[#138601] font-semibold">≡</span>
            <span>
              CATEGORY {String(currentStep + 1).padStart(2, "0")} /{" "}
              {String(ELECTION_ROLES.length).padStart(2, "0")}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">{currentRole.title}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Please select your preferred candidate for the position of{" "}
            {currentRole.title}.
          </p>
        </div>

        {/* Candidates grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={selectedCandidateId === candidate.id}
                onSelect={(id) => handleSelectCandidate(currentRole.id, id)}
                onReadManifesto={handleOpenManifesto}
              />
            ))}
          </div>
        </div>

        {/* Step navigation footer */}
        <div className="shrink-0 px-5 py-4 border-t border-[#E2E8F0] bg-white flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              currentStep === 0
                ? "border-slate-100 text-slate-300 cursor-not-allowed"
                : "border-[#E2E8F0] text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ChevronLeft size={15} />
            Previous Role
          </button>

          <span className="text-xs text-slate-400 font-medium">
            Step {currentStep + 1} of {ELECTION_ROLES.length} Roles
          </span>

          {currentStep < ELECTION_ROLES.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[#138601] text-white hover:bg-[#0e6001] transition-all"
            >
              Next Role
              <ChevronRight size={15} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allVoted}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                allVoted
                  ? "bg-[#138601] text-white hover:bg-[#0e6001] shadow-md shadow-green-200 active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              Submit Ballot
              <ChevronRight size={15} />
            </button>
          )}
        </div>
      </div>
    );
  };

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <VotingLayout
        activeNav={activeNav}
        onNavChange={handleNavChange}
        mobilePanel={mobilePanel}
        onMobilePanelChange={setMobilePanel}
        progressSidebar={
          <ProgressSidebar
            roles={ELECTION_ROLES}
            currentStep={submitted ? ELECTION_ROLES.length : currentStep}
            selections={selections}
            onStepClick={(i) => {
              setCurrentStep(i);
              setActiveNav("Home");
            }}
          />
        }
        ballotSidebar={
          <BallotSidebar
            roles={ELECTION_ROLES}
            selections={selections}
            onSubmit={handleSubmit}
            submitted={submitted}
            onViewLiveStats={() => handleNavChange("Live Stats")}
            currentRoleId={currentRole?.id}
          />
        }
      >
        {renderMainContent()}
      </VotingLayout>

      <ManifestoModal
        candidate={manifestoCandidate}
        isOpen={isModalOpen}
        onClose={handleCloseManifesto}
        onSelect={(id) => handleSelectCandidate(currentRole.id, id)}
        isSelected={manifestoCandidate?.id === selectedCandidateId}
        roleTitle={currentRole?.title}
      />
    </>
  );
};

export default VotingPortal;
