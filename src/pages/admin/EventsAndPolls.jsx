import { useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Users,
  Vote,
} from "lucide-react";

const STATS = [
  {
    label: "Upcoming Events",
    value: "03",
    Icon: CalendarDays,
    iconBg: "bg-[#EFF6FF]",
    iconColor: "text-[#2563EB]",
  },
  {
    label: "Active Polls",
    value: "02",
    Icon: BarChart3,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    label: "Total Attendees",
    value: "1,240",
    Icon: Users,
    iconBg: "bg-[#FFF7ED]",
    iconColor: "text-[#EA580C]",
  },
  {
    label: "Total Votes Count",
    value: "856",
    Icon: Vote,
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
  },
];

const EVENTS = [
  {
    id: "evt-1",
    tab: "upcoming",
    month: "NOV",
    day: "14",
    badge: "Registration Open",
    badgeClass: "bg-[#DCFCE7] text-[#166534]",
    title: "NACOS Freshers Orientation '24",
    desc: "An introduction to the department for all 100L students. Featuring guest speakers and departmental tours.",
    time: "10:00 AM - 02:00 PM",
    location: "University Auditorium",
    people: "156 Registered",
    action: "Manage",
  },
  {
    id: "evt-2",
    tab: "upcoming",
    month: "NOV",
    day: "28",
    badge: "Planning Phase",
    badgeClass: "bg-[#DBEAFE] text-[#2563EB]",
    title: "Tech Week: Innovation Hackathon",
    desc: "Annual hackathon event. Teams of 4. Requires venue booking and sponsorship confirmation.",
    time: "09:00 AM - 06:00 PM",
    location: "Main Lab & Hall B",
    people: "Registration Closed",
    action: "Edit",
  },
  {
    id: "evt-3",
    tab: "past",
    month: "OCT",
    day: "25",
    badge: "Concluded",
    badgeClass: "bg-[#F1F5F9] text-[#475569]",
    title: "Alumni Mentorship Session",
    desc: "Virtual session with past NACOS presidents sharing industry experience.",
    time: "04:00 PM - 05:30 PM",
    location: "Google Meet",
    people: "84 Attendees",
    action: "Report",
  },
  {
    id: "evt-4",
    tab: "drafts",
    month: "DEC",
    day: "06",
    badge: "Draft",
    badgeClass: "bg-[#FEF9C3] text-[#854D0E]",
    title: "CGPA Strategy Workshop",
    desc: "Session draft for study techniques, revision timetables, and course resources.",
    time: "02:00 PM - 04:00 PM",
    location: "Seminar Room",
    people: "Not Published",
    action: "Edit",
  },
];

const POLLS = [
  {
    id: "poll-1",
    title: "Preferred Date for Dinner?",
    status: "Active",
    statusClass: "bg-[#DCFCE7] text-[#166534]",
    options: [
      { label: "Dec 15th (Friday)", percent: 62 },
      { label: "Dec 16th (Saturday)", percent: 38 },
    ],
    meta: "145 votes • Ends in 4h",
    action: "End Poll",
    actionClass: "text-[#EF4444]",
  },
  {
    id: "poll-2",
    title: "Next Workshop Topic?",
    status: "Active",
    statusClass: "bg-[#DCFCE7] text-[#166534]",
    options: [
      { label: "Cybersecurity", percent: 45 },
      { label: "Web3 / Blockchain", percent: 30 },
      { label: "Data Science", percent: 25 },
    ],
    meta: "89 votes • Ends in 2 days",
    action: "End Poll",
    actionClass: "text-[#EF4444]",
  },
  {
    id: "poll-3",
    title: "Department Jersey Color",
    status: "Closed",
    statusClass: "bg-[#F1F5F9] text-[#475569]",
    options: [{ label: "Winner: Navy Blue", percent: 55 }],
    meta: "Final results",
    action: "View full results",
    actionClass: "text-[#16A34A]",
  },
];

function StatCard(props) {
  const { label, value, Icon, iconBg, iconColor } = props;
  return (
    <div className="bg-white border border-[#F1F5F9] shadow-sm rounded-3xl p-5 flex items-center gap-4">
      <span
        className={`size-12 rounded-2xl flex items-center justify-center ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </span>
      <span className="flex flex-col gap-0.5">
        <p className="text-xs font-bold uppercase text-[#64748B]">{label}</p>
        <p className="text-2xl font-bold text-[#0F172A]">{value}</p>
      </span>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        active
          ? "bg-[#138601] text-white"
          : "bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]"
      }`}
    >
      {children}
    </button>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white border border-[#F1F5F9] shadow-sm rounded-3xl p-5">
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center w-14 shrink-0 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] py-3">
          <p className="text-[10px] font-bold text-[#64748B]">{event.month}</p>
          <p className="text-xl font-extrabold text-[#0F172A] leading-none">
            {event.day}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${event.badgeClass}`}
              >
                {event.badge}
              </span>
              <h3 className="mt-2 text-[#0F172A] font-bold text-base md:text-lg truncate">
                {event.title}
              </h3>
              <p className="mt-1 text-sm text-[#64748B] line-clamp-2">
                {event.desc}
              </p>
            </div>

            <button
              type="button"
              className="shrink-0 px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white text-sm font-semibold text-[#334155] hover:bg-[#F8FAFC]"
            >
              {event.action}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#64748B]">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {event.time}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {event.people}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PollCard({ poll }) {
  return (
    <div className="bg-white border border-[#F1F5F9] shadow-sm rounded-3xl p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-sm font-bold text-[#0F172A]">{poll.title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-[11px] font-semibold ${poll.statusClass}`}
        >
          {poll.status}
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {poll.options.map((opt) => (
          <div key={opt.label} className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs font-semibold text-[#475569]">
              <span className="truncate">{opt.label}</span>
              <span>{opt.percent}%</span>
            </div>
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#138601] rounded-full"
                style={{ width: `${opt.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <p className="text-[#94A3B8] font-medium">{poll.meta}</p>
        <button type="button" className={`font-semibold ${poll.actionClass}`}>
          {poll.action}
        </button>
      </div>
    </div>
  );
}

export default function EventsAndPolls() {
  const [tab, setTab] = useState("upcoming");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const visibleEvents = useMemo(
    () => EVENTS.filter((evt) => evt.tab === tab),
    [tab]
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <span className="flex flex-col gap-1">
          <h1 className="text-[#0F172A] font-bold text-2xl lg:text-3xl">
            Events &amp; Polls
          </h1>
          <p className="text-sm md:text-base text-[#64748B]">
            Manage department events, track attendance, and gather student
            feedback.
          </p>
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="flex items-center w-max gap-2 py-2 px-4 border border-[#E2E8F0] bg-white rounded-xl text-sm text-[#334155] font-medium transition-all active:scale-95 duration-150"
          >
            <CalendarDays className="w-4 h-4 text-[#64748B]" />
            Calendar View
          </button>

          <button
            type="button"
            className="flex items-center w-max gap-2 py-2 px-4 bg-[#138601] rounded-xl text-sm text-white font-semibold transition-all active:scale-95 duration-150"
          >
            <Plus className="w-4 h-4" />
            Create New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {STATS.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
            value={s.value}
            Icon={s.Icon}
            iconBg={s.iconBg}
            iconColor={s.iconColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-[#0F172A] font-bold text-lg">Scheduled Events</h2>

            <div className="flex items-center gap-2">
              <TabButton active={tab === "upcoming"} onClick={() => setTab("upcoming")}>
                Upcoming
              </TabButton>
              <TabButton active={tab === "past"} onClick={() => setTab("past")}>
                Past
              </TabButton>
              <TabButton active={tab === "drafts"} onClick={() => setTab("drafts")}>
                Drafts
              </TabButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {visibleEvents.map((evt) => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        </section>

        <aside className="xl:col-span-1 flex flex-col gap-6">
          <section className="bg-white border border-[#F1F5F9] shadow-sm rounded-3xl p-5">
            <h2 className="text-[#0F172A] font-bold text-lg">Polls &amp; Voting</h2>

            <div className="mt-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-3xl p-4">
              <p className="text-sm font-bold text-[#0F172A]">Quick Poll Creator</p>

              <div className="mt-3 flex flex-col gap-2">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                />

                {options.map((opt, idx) => (
                  <input
                    key={idx}
                    value={opt}
                    onChange={(e) => {
                      const next = [...options];
                      next[idx] = e.target.value;
                      setOptions(next);
                    }}
                    placeholder={`Option ${idx + 1}`}
                    className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                ))}

                <button
                  type="button"
                  onClick={() => setOptions((prev) => [...prev, ""])}
                  className="w-max text-xs font-semibold text-[#16A34A]"
                >
                  + Add another option
                </button>

                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-[#64748B] font-medium">
                    Duration: 24 Hours
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-[#138601] text-white text-xs font-semibold"
                  >
                    Launch Poll
                  </button>
                </div>
              </div>
            </div>
          </section>

          {POLLS.map((p) => (
            <PollCard key={p.id} poll={p} />
          ))}
        </aside>
      </div>
    </div>
  );
}
