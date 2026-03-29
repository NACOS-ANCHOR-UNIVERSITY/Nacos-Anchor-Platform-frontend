<<<<<<< Updated upstream
import { useEffect, useMemo, useState, useCallback } from "react";
=======
import { useMemo, useState, useEffect } from "react";
>>>>>>> Stashed changes
import {
  BarChart3,
  CalendarDays,
  Clock,
  MapPin,
  Megaphone,
  MoreVertical,
  Plus,
  PlusCircle,
  Users,
  Vote,
  X,
  Trash2,
  Edit,
  Loader2,
} from "lucide-react";
<<<<<<< Updated upstream
import {
  getEventsDashboard,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../services/adminEventsService";

// Helper function to parse event date
const parseEventDate = (dateStr) => {
  const date = new Date(dateStr);
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  return {
    month: months[date.getMonth()],
    day: String(date.getDate()).padStart(2, "0"),
  };
};
=======
import { useAdminEventsDashboard, useAdminEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from "@/hooks/useAdmin";

// Default stats structure for error/loading states
const DEFAULT_STATS = [
  {
    label: "Total Events",
    value: "-",
    Icon: CalendarDays,
    iconBg: "bg-[#EFF6FF]",
    iconColor: "text-[#2563EB]",
  },
  {
    label: "Upcoming Events",
    value: "-",
    Icon: CalendarDays,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
  },
  {
    label: "Past Events",
    value: "-",
    Icon: Users,
    iconBg: "bg-[#FFF7ED]",
    iconColor: "text-[#EA580C]",
  },
  {
    label: "Draft Events",
    value: "-",
    Icon: Vote,
    iconBg: "bg-[#F3E8FF]",
    iconColor: "text-[#9333EA]",
  },
];
>>>>>>> Stashed changes

// Helper to determine event status/tab
const getEventTab = (eventDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDateObj = new Date(eventDate);
  eventDateObj.setHours(0, 0, 0, 0);

  if (eventDateObj >= today) return "upcoming";
  return "past";
};

// Transform API event to display format
const transformEvent = (apiEvent) => {
  const { month, day } = parseEventDate(apiEvent.event_date);
  const tab = getEventTab(apiEvent.event_date);
  const isUpcoming = tab === "upcoming";
  // dateVariant controls compact / neutral styles for the date badge
  // mark sold-out events as 'neutral' so they render appropriately
  const dateVariant = apiEvent.is_sold_out ? "neutral" : undefined;
  return {
    id: apiEvent.id,
    tab,
    dateVariant,
    month,
    day,
    badge: apiEvent.is_sold_out ? "Sold Out" : isUpcoming ? "Registration Open" : "Concluded",
    badgeClass: apiEvent.is_sold_out
      ? "bg-[#FEE2E2] text-[#991B1B]"
      : isUpcoming
      ? "bg-[#DCFCE7] text-[#166534]"
      : "bg-[#F1F5F9] text-[#475569]",
    title: apiEvent.title,
    desc: apiEvent.description,
    time: apiEvent.time_range,
    location: apiEvent.location,
    people: apiEvent.is_sold_out ? "Sold Out" : isUpcoming ? "Open" : "Concluded",
    action: isUpcoming ? "Manage" : "View",
    category: apiEvent.category,
    image_url: apiEvent.image_url,
    button_text: apiEvent.button_text,
    registration_link: apiEvent.registration_link,
    is_sold_out: apiEvent.is_sold_out,
    event_date: apiEvent.event_date,
    created_at: apiEvent.created_at,
    // Keep original data for editing
    _original: apiEvent,
  };
};

const POLLS = [
  {
    id: "poll-1",
    title: "Preferred Date for Dinner?",
    status: "Active",
    statusClass: "bg-[#DCFCE7] text-[#166534]",
    options: [
      { label: "Dec 15th (Friday)", percent: 63 },
      { label: "Dec 16th (Saturday)", percent: 37 },
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
    <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl px-5 py-4 flex items-center gap-4">
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
      className={`h-7 px-3 rounded-full text-[11px] font-semibold transition-colors ${
        active
          ? "bg-white text-[#0F172A] shadow-sm"
          : "bg-transparent text-[#64748B] hover:text-[#0F172A]"
      }`}
    >
      {children}
    </button>
  );
}

function EventCard({ event, onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  
  const dateBgClass = useMemo(() => {
    if (event.dateVariant === "neutral") {
      return "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]";
    }

    switch (event.tab) {
      case "upcoming":
        return "bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]";
      case "past":
        return "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]";
      case "drafts":
        return "bg-[#FEF9C3] border-[#FDE68A] text-[#854D0E]";
      default:
        return "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]";
    }
  }, [event.dateVariant, event.tab]);

  return (
    <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-4">
      <div className="flex gap-4">
        <div
          className={`flex flex-col items-center justify-center w-16 h-16 shrink-0 rounded-2xl border ${dateBgClass}`}
        >
          <p className="text-[11px] font-bold uppercase leading-none">
            {event.month}
          </p>
          <p className="mt-1 text-2xl font-extrabold leading-none">
            {event.day}
          </p>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold ${event.badgeClass}`}
            >
              {event.badge}
            </span>
            {event.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium bg-[#F1F5F9] text-[#64748B]">
                {event.category}
              </span>
            )}
          </div>
          <h3 className="mt-2 text-[#0F172A] font-bold text-[15px] md:text-base">
            {event.title}
          </h3>
          <p className="mt-1 text-[13px] text-[#64748B] line-clamp-2">
            {event.desc}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#64748B]">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {event.time}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
          </div>
        </div>

        <div className="shrink-0 flex items-stretch gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              className="size-7 rounded-lg border border-[#E2E8F0] bg-white grid place-items-center text-[#64748B] hover:bg-[#F8FAFC] mt-0.5"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
<<<<<<< Updated upstream
            
            {showMenu && (
              <div className="absolute right-0 top-8 z-10 bg-white border border-[#E2E8F0] rounded-lg shadow-lg py-1 min-w-[120px]">
=======

            {showMenu && (
              <div className="absolute right-0 mt-1 w-32 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10">
>>>>>>> Stashed changes
                <button
                  type="button"
                  onClick={() => {
                    onEdit(event);
                    setShowMenu(false);
                  }}
<<<<<<< Updated upstream
                  className="w-full px-3 py-2 text-left text-sm text-[#334155] hover:bg-[#F8FAFC] flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
=======
                  className="w-full text-left px-4 py-2 text-sm text-[#0F172A] hover:bg-[#F8FAFC] border-b border-[#E2E8F0]"
                >
>>>>>>> Stashed changes
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
<<<<<<< Updated upstream
                    onDelete(event);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-[#EF4444] hover:bg-[#FEE2E2] flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
=======
                    onDelete(event.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#EF4444] hover:bg-[#FEE2E2]"
                >
>>>>>>> Stashed changes
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between items-end pl-3 border-l border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              {event.registration_link && (
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-7 px-2 rounded-full bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold border border-[#E2E8F0] hover:bg-[#E2E8F0]"
                >
                  {event.button_text || "Register"}
                </a>
              )}
            </div>

            <button
              type="button"
<<<<<<< Updated upstream
              onClick={() => onEdit(event)}
=======
              onClick={() => {
                if (event.registration_link) {
                  window.open(event.registration_link, "_blank");
                }
              }}
>>>>>>> Stashed changes
              className={`h-7 px-3.5 rounded-lg text-[11px] font-semibold transition-colors ${
                event.action === "Register"
                  ? "bg-[#138601] text-white hover:bg-green-700"
                  : "border border-[#E2E8F0] bg-white text-[#334155] hover:bg-[#F8FAFC]"
              }`}
            >
              {event.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PollCard({ poll }) {
  return (
    <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-3xl p-5">
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
<<<<<<< Updated upstream
  
  // API State
  const [events, setEvents] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    total_events: 0,
    upcoming_events: 0,
    past_events: 0,
    draft_events: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal State
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [eventForm, setEventForm] = useState({
=======
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
>>>>>>> Stashed changes
    title: "",
    category: "",
    image_url: "",
    event_date: "",
    time_range: "",
    location: "",
    description: "",
    button_text: "Register Now",
    registration_link: "",
    is_sold_out: 0,
  });

<<<<<<< Updated upstream
  // Fetch dashboard stats and events
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, eventsData] = await Promise.all([
        getEventsDashboard(),
        getEvents(),
      ]);
      setDashboardStats(statsData);
      // transform and ensure latest-first ordering by `created_at` (fallback to event_date)
      const transformed = eventsData
        .map(transformEvent)
        .sort((a, b) => new Date(b.created_at || b.event_date) - new Date(a.created_at || a.event_date));
      setEvents(transformed);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
      console.error("Error fetching events data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Stats cards config using API data
  const STATS = useMemo(() => [
    {
      label: "Total Events",
      value: String(dashboardStats.total_events).padStart(2, "0"),
      Icon: CalendarDays,
      iconBg: "bg-[#EFF6FF]",
      iconColor: "text-[#2563EB]",
    },
    {
      label: "Upcoming Events",
      value: String(dashboardStats.upcoming_events).padStart(2, "0"),
      Icon: BarChart3,
      iconBg: "bg-[#DCFCE7]",
      iconColor: "text-[#16A34A]",
    },
    {
      label: "Past Events",
      value: String(dashboardStats.past_events).padStart(2, "0"),
      Icon: Users,
      iconBg: "bg-[#FFF7ED]",
      iconColor: "text-[#EA580C]",
    },
    {
      label: "Draft Events",
      value: String(dashboardStats.draft_events).padStart(2, "0"),
      Icon: Vote,
      iconBg: "bg-[#F3E8FF]",
      iconColor: "text-[#9333EA]",
    },
  ], [dashboardStats]);

  const visibleEvents = useMemo(() => {
    if (tab === "upcoming") {
      return events.filter((evt) => evt.tab === "upcoming");
=======
  // Fetch events dashboard data
  const { data: dashboardData, isLoading: dashboardLoading, error: dashboardError } = useAdminEventsDashboard();

  // Fetch all events data
  const { data: eventsData, isLoading: eventsLoading, error: eventsError } = useAdminEvents();

  // Mutations
  const createEventMutation = useCreateEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  // Log any errors
  useEffect(() => {
    if (dashboardError) {
      console.error("Failed to fetch events dashboard:", dashboardError);
    }
    if (eventsError) {
      console.error("Failed to fetch events:", eventsError);
    }
  }, [dashboardError, eventsError]);

  // Transform API data to stats cards
  useEffect(() => {
    if (dashboardData?.data) {
      const eventData = dashboardData.data;
      
      setStats([
        {
          ...DEFAULT_STATS[0],
          value: eventData.total_events?.toString() || "-",
        },
        {
          ...DEFAULT_STATS[1],
          value: eventData.upcoming_events?.toString() || "-",
        },
        {
          ...DEFAULT_STATS[2],
          value: eventData.past_events?.toString() || "-",
        },
        {
          ...DEFAULT_STATS[3],
          value: eventData.draft_events?.toString() || "-",
        },
      ]);
    }
  }, [dashboardData]);

  // Transform API events to display format
  useEffect(() => {
    if (eventsData?.data && Array.isArray(eventsData.data)) {
      const transformedEvents = eventsData.data.map((event) => {
        const eventDate = new Date(event.event_date);
        const month = eventDate.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
        const day = eventDate.getDate().toString().padStart(2, "0");

        return {
          id: event.id,
          tab: "upcoming",
          month,
          day,
          event_date: event.event_date,
          badge: event.category || "Event",
          badgeClass: "bg-[#DBEAFE] text-[#2563EB]",
          title: event.title,
          desc: event.description || "",
          time: event.time_range || "Time TBA",
          location: event.location || "Location TBA",
          people: event.is_sold_out ? "Sold Out" : "Registration Open",
          action: event.registration_link ? "Register" : "View",
          avatars: [],
          image_url: event.image_url,
          registration_link: event.registration_link,
        };
      });
      setDisplayEvents(transformedEvents);
    }
  }, [eventsData]);

  // Event form handlers
  const handleOpenCreateForm = () => {
    setEditingEvent(null);
    setFormError("");
    setFormData({
      title: "",
      category: "",
      image_url: "",
      event_date: "",
      time_range: "",
      location: "",
      description: "",
      button_text: "Register Now",
      registration_link: "",
      is_sold_out: 0,
    });
    setShowEventForm(true);
  };

  const handleOpenEditForm = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      category: event.badge,
      image_url: event.image_url || "",
      event_date: calculateEventDate(event),
      time_range: event.time,
      location: event.location,
      description: event.desc,
      button_text: "Register Now",
      registration_link: event.registration_link || "",
      is_sold_out: event.people === "Sold Out" ? 1 : 0,
    });
    setShowEventForm(true);
  };

  const calculateEventDate = (event) => {
    // Use the original event_date if available
    return event.event_date || "";
  };

  const handleCloseForm = () => {
    setShowEventForm(false);
    setEditingEvent(null);
    setFormError("");
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.category || !formData.event_date || !formData.time_range || !formData.location || !formData.description) {
      setFormError("Please fill in all required fields");
      return;
    }

    setFormError("");
    console.log("Submitting event form:", { editingEvent, formData });
    
    if (editingEvent) {
      console.log("Updating event with ID:", editingEvent.id);
      updateEventMutation.mutate(
        { id: editingEvent.id, payload: formData },
        {
          onSuccess: () => {
            console.log("Event updated successfully");
            handleCloseForm();
          },
          onError: (error) => {
            console.error("Update error:", error);
            setFormError(`Failed to update event: ${error.message || "Unknown error"}`);
          },
        }
      );
    } else {
      console.log("Creating new event");
      createEventMutation.mutate(formData, {
        onSuccess: () => {
          console.log("Event created successfully");
          handleCloseForm();
        },
        onError: (error) => {
          console.error("Create error:", error);
          setFormError(`Failed to create event: ${error.message || "Unknown error"}`);
        },
      });
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      console.log("Deleting event with ID:", eventId);
      deleteEventMutation.mutate(eventId, {
        onError: (error) => {
          console.error("Delete error:", error);
          alert(`Failed to delete event: ${error.message || "Unknown error"}`);
        },
      });
    }
  };

  const visibleEvents = useMemo(() => {
    if (tab === "upcoming") {
      return displayEvents.filter((evt) => evt.tab !== "drafts");
>>>>>>> Stashed changes
    }
    return events.filter((evt) => evt.tab === tab);
  }, [tab, events]);

<<<<<<< Updated upstream
  // Open modal for creating new event
  const handleCreateEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: "",
      category: "",
      image_url: "",
      event_date: "",
      time_range: "",
      location: "",
      description: "",
      button_text: "Register Now",
      registration_link: "",
      is_sold_out: 0,
    });
    setShowEventModal(true);
  };

  // Open modal for editing event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm({
      title: event._original?.title || event.title,
      category: event._original?.category || event.category || "",
      image_url: event._original?.image_url || event.image_url || "",
      event_date: event._original?.event_date || event.event_date || "",
      time_range: event._original?.time_range || event.time || "",
      location: event._original?.location || event.location || "",
      description: event._original?.description || event.desc || "",
      button_text: event._original?.button_text || event.button_text || "Register Now",
      registration_link: event._original?.registration_link || event.registration_link || "",
      is_sold_out: event._original?.is_sold_out ?? event.is_sold_out ?? 0,
    });
    setShowEventModal(true);
  };

  // Open delete confirmation
  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirm(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!eventToDelete) return;
    setSubmitting(true);
    try {
      await deleteEvent(eventToDelete.id);
      await fetchData();
      setShowDeleteConfirm(false);
      setEventToDelete(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete event");
    } finally {
      setSubmitting(false);
    }
  };

  // Submit form (create or update)
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingEvent) {
        await updateEvent(editingEvent.id, eventForm);
      } else {
        await createEvent(eventForm);
      }
      await fetchData();
      setShowEventModal(false);
      setEditingEvent(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save event");
    } finally {
      setSubmitting(false);
    }
  };

  // Update form field
  const updateFormField = (field, value) => {
    setEventForm((prev) => ({ ...prev, [field]: value }));
  };
=======
    return displayEvents.filter((evt) => evt.tab === tab);
  }, [tab, displayEvents]);
>>>>>>> Stashed changes

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <span className="flex flex-col gap-1">
          <h1 className="text-[#0F172A] font-bold text-2xl lg:text-3xl">
            Events & Polls
          </h1>
          <p className="text-sm md:text-base text-[#64748B]">
            Manage department events, track attendance, and gather student feedback.
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
<<<<<<< Updated upstream
            onClick={handleCreateEvent}
=======
            onClick={handleOpenCreateForm}
>>>>>>> Stashed changes
            className="flex items-center w-max gap-2 py-2 px-4 bg-[#138601] rounded-xl text-sm text-white font-semibold transition-all active:scale-95 duration-150"
          >
            <Plus className="w-4 h-4" />
            Create New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s) => (
          <StatCard
            key={s.label}
            label={s.label}
<<<<<<< Updated upstream
            value={loading ? "..." : s.value}
=======
            value={dashboardLoading ? "..." : s.value}
>>>>>>> Stashed changes
            Icon={s.Icon}
            iconBg={s.iconBg}
            iconColor={s.iconColor}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-[#0F172A] font-bold text-lg inline-flex items-center gap-2">
              <Megaphone className="w-[22px] h-[22px] text-[#138601]" />
              Scheduled Events
            </h2>

            <div className="flex items-center gap-1 p-1 rounded-full bg-[#F1F5F9] border border-[#E2E8F0]">
              <TabButton active={tab === "upcoming"} onClick={() => setTab("upcoming")}>
                Upcoming
              </TabButton>
              <TabButton active={tab === "past"} onClick={() => setTab("past")}>
                Past
              </TabButton>
            </div>
          </div>

          <div className="flex flex-col gap-4">
<<<<<<< Updated upstream
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#138601]" />
              </div>
            ) : visibleEvents.length === 0 ? (
              <div className="text-center py-12 text-[#64748B]">
                <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No {tab} events found</p>
              </div>
            ) : (
              visibleEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onEdit={handleEditEvent}
=======
            {eventsLoading ? (
              <div className="text-center py-8 text-[#64748B]">
                <p className="text-sm font-medium">Loading events...</p>
              </div>
            ) : visibleEvents.length === 0 ? (
              <div className="text-center py-8 text-[#64748B]">
                <p className="text-sm font-medium">No events found</p>
              </div>
            ) : (
              visibleEvents.map((evt) => (
                <EventCard 
                  key={evt.id} 
                  event={evt}
                  onEdit={handleOpenEditForm}
>>>>>>> Stashed changes
                  onDelete={handleDeleteEvent}
                />
              ))
            )}
          </div>
        </section>

        <aside className="xl:col-span-1 flex flex-col gap-6">
          <section className="flex flex-col gap-6">
            <h2 className="text-[#0F172A] font-bold text-lg inline-flex items-center gap-2">
              <span className="size-6 rounded-md border border-[#BBF7D0] bg-[#F0FDF4] grid place-items-center">
                <BarChart3 className="w-4 h-4 text-[#138601]" />
              </span>
              Polls & Voting
            </h2>

            <div className="mt-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#166534]" />
                <p className="text-sm font-bold text-[#166534]">Quick Poll Creator</p>
              </div>

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
                  className="w-max text-xs font-semibold text-[#16A34A] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add another option
                </button>

                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-[#64748B] font-medium">
                    Duration: 24 Hours
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl bg-[#138601] text-white text-xs font-semibold shadow-sm"
                  >
                    Launch Poll
                  </button>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            {POLLS.map((p) => (
              <PollCard key={p.id} poll={p} />
            ))}
          </div>
        </aside>
      </div>

<<<<<<< Updated upstream
      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
            <div className="flex items-center justify-between p-6 border-b border-[#E2E8F0]">
              <h2 className="text-xl font-bold text-[#0F172A]">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEvent} className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#334155] mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => updateFormField("title", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., NACOS Freshers Orientation '26"
=======
      {/* Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#0F172A] mb-4">
                {editingEvent ? "Edit Event" : "Create New Event"}
              </h2>

              {formError && (
                <div className="mb-4 p-3 bg-[#FEE2E2] border border-[#FECACA] rounded-lg text-sm text-[#DC2626]">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmitForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Event title"
>>>>>>> Stashed changes
                  />
                </div>

                <div>
<<<<<<< Updated upstream
                  <label className="block text-sm font-medium text-[#334155] mb-1">
=======
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
>>>>>>> Stashed changes
                    Category
                  </label>
                  <input
                    type="text"
<<<<<<< Updated upstream
                    value={eventForm.category}
                    onChange={(e) => updateFormField("category", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
=======
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
>>>>>>> Stashed changes
                    placeholder="e.g., Orientation, Workshop"
                  />
                </div>

                <div>
<<<<<<< Updated upstream
                  <label className="block text-sm font-medium text-[#334155] mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.event_date}
                    onChange={(e) => updateFormField("event_date", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
=======
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
>>>>>>> Stashed changes
                  />
                </div>

                <div>
<<<<<<< Updated upstream
                  <label className="block text-sm font-medium text-[#334155] mb-1">
                    Time Range *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.time_range}
                    onChange={(e) => updateFormField("time_range", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
=======
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
                    Time Range
                  </label>
                  <input
                    type="text"
                    name="time_range"
                    value={formData.time_range}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
>>>>>>> Stashed changes
                    placeholder="e.g., 10:00 AM - 2:00 PM"
                  />
                </div>

                <div>
<<<<<<< Updated upstream
                  <label className="block text-sm font-medium text-[#334155] mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventForm.location}
                    onChange={(e) => updateFormField("location", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
=======
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
>>>>>>> Stashed changes
                    placeholder="e.g., University Auditorium"
                  />
                </div>

<<<<<<< Updated upstream
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#334155] mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={eventForm.description}
                    onChange={(e) => updateFormField("description", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Describe the event..."
=======
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="Event description"
>>>>>>> Stashed changes
                  />
                </div>

                <div>
<<<<<<< Updated upstream
                  <label className="block text-sm font-medium text-[#334155] mb-1">
=======
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
>>>>>>> Stashed changes
                    Image URL
                  </label>
                  <input
                    type="url"
<<<<<<< Updated upstream
                    value={eventForm.image_url}
                    onChange={(e) => updateFormField("image_url", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
=======
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
>>>>>>> Stashed changes
                    placeholder="https://..."
                  />
                </div>

                <div>
<<<<<<< Updated upstream
                  <label className="block text-sm font-medium text-[#334155] mb-1">
=======
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">
>>>>>>> Stashed changes
                    Registration Link
                  </label>
                  <input
                    type="url"
<<<<<<< Updated upstream
                    value={eventForm.registration_link}
                    onChange={(e) => updateFormField("registration_link", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="https://forms.google.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#334155] mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={eventForm.button_text}
                    onChange={(e) => updateFormField("button_text", e.target.value)}
                    className="w-full rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Register Now"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_sold_out"
                    checked={eventForm.is_sold_out === 1}
                    onChange={(e) => updateFormField("is_sold_out", e.target.checked ? 1 : 0)}
                    className="w-4 h-4 rounded border-[#E2E8F0] text-[#138601] focus:ring-green-500"
                  />
                  <label htmlFor="is_sold_out" className="text-sm font-medium text-[#334155]">
                    Mark as Sold Out
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#334155] hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-[#138601] text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingEvent ? "Update Event" : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && eventToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md m-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-red-100">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Delete Event</h3>
                <p className="text-sm text-[#64748B]">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-[#334155] mb-6">
              Are you sure you want to delete <strong>"{eventToDelete.title}"</strong>?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setEventToDelete(null);
                }}
                className="px-4 py-2 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#334155] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={submitting}
                className="px-4 py-2 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete Event
              </button>
=======
                    name="registration_link"
                    value={formData.registration_link}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="is_sold_out"
                    checked={formData.is_sold_out === 1}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded border-[#E2E8F0]"
                  />
                  <label className="text-sm font-semibold text-[#0F172A]">
                    Mark as Sold Out
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 px-4 py-2 border border-[#E2E8F0] bg-white text-[#0F172A] rounded-lg text-sm font-semibold hover:bg-[#F8FAFC]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createEventMutation.isPending || updateEventMutation.isPending}
                    className="flex-1 px-4 py-2 bg-[#138601] text-white rounded-lg text-sm font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createEventMutation.isPending || updateEventMutation.isPending
                      ? (editingEvent ? "Updating..." : "Creating...")
                      : (editingEvent ? "Update" : "Create")}
                  </button>
                </div>
              </form>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
