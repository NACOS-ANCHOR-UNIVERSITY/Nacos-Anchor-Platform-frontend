import { useMemo, useState } from "react";
import {
  AdminTopbar,
  StatCards,
  PaymentsTable,
  RecordPaymentModal,
} from "../../features/admin/payments";
import { useAdminPayments } from "../../hooks";
import Skeleton from "../../components/ui/Skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import exportReport from "../../features/admin/payments/assets/icons/Export-report.png";
import recordPayment from "../../features/admin/payments/assets/icons/Record-payment.png";

const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

// Helper to format dates and handle invalid/null dates from the database
const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  // Convert to string in case it's not
  const dateStr = String(dateString);

  // Check for invalid date patterns like "0000-00-00" or dates with year -0001
  if (
    dateStr.includes("-0001") ||
    dateStr.includes("0000-00-00") ||
    dateStr.startsWith("0000")
  ) {
    return "N/A";
  }

  // Try to parse the date (handle MySQL datetime format: "2026-01-29 14:30:00")
  let date = new Date(dateStr.replace(" ", "T"));

  // If that fails, try parsing directly
  if (isNaN(date.getTime())) {
    date = new Date(dateStr);
  }

  // Check if date is valid and year is reasonable (after year 2000)
  if (isNaN(date.getTime()) || date.getFullYear() < 2000) {
    return "N/A";
  }

  // Format as "Jan 28, 2026 1:28 PM"
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const handleExportCSV = (data, filename = "payments-report.csv") => {
  if (!data || !data.length) return;

  const headers = Object.keys(data[0]).join(",");
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) => `"${val}"`)
      .join(","),
  );
  const csvContent =
    "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: apiResponse, isLoading, error, refetch } = useAdminPayments();

  const stats = useMemo(() => {
    const metrics = apiResponse?.data?.metrics || {};

    return [
      {
        label: "Total Revenue",
        value: metrics.total_revenue || "₦ 0",
        delta: "+12%",
        deltaLabel: "vs last month",
        deltaTone: "up",
        color: "green",
      },
      {
        label: "Pending Approvals",
        value: String(metrics.pending_approvals || 0),
        delta: "-5%",
        deltaLabel: "vs last week",
        deltaTone: "down",
        color: "amber",
      },
      {
        label: "Approved Receipts",
        value: String(metrics.approved_receipts || 0),
        delta: "+8%",
        deltaLabel: "vs last month",
        deltaTone: "up",
        color: "blue",
      },
      {
        label: "Verification Rate",
        value: metrics.verification_rate || "0%",
        delta: "+2%",
        deltaLabel: "vs last month",
        deltaTone: "up",
        color: "purple",
      },
    ];
  }, [apiResponse]);

  const rows = useMemo(() => {
    const transactions = apiResponse?.data?.transactions;
    if (!transactions) return [];

    return transactions
      .filter((t) => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          !searchTerm ||
          t.full_name?.toLowerCase().includes(searchLower) ||
          t.matric_no?.toLowerCase().includes(searchLower) ||
          t.reference_id?.toLowerCase().includes(searchLower) ||
          t.description?.toLowerCase().includes(searchLower);

        const matchesStatus =
          statusFilter === "All" || t.status === statusFilter;

        const matchesDate = !dateFilter || t.date_paid === dateFilter;

        return matchesSearch && matchesStatus && matchesDate;
      })
      .map((t) => ({
        id: t.id,
        name: t.full_name,
        matric: t.matric_no,
        avatar: t.avatar_url?.startsWith("http") ? t.avatar_url : null,
        transaction: t.description,
        ref: t.reference_id,
        date: formatDate(
          t.date || t.created_at || t.date_paid || t.formatted_date,
        ),
        amount: t.formatted_amount,
        status: t.status === "Successful" ? "Approved" : t.status,
        initials: getInitials(t.full_name),
        avatarTone: "neutral",
      }));
  }, [apiResponse, searchTerm, statusFilter, dateFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ fontFamily: "Manrope" }}>
        <div className="bg-slate-50 px-4 md:px-8 py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
          <div className="mt-6">
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen" style={{ fontFamily: "Manrope" }}>
        <div className="bg-slate-50 px-4 md:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to Load Payments Data
            </h3>
            <p className="text-gray-500 mb-6 max-w-md">
              {error?.message ||
                "Unable to fetch payment information. Please try again."}
            </p>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#138601] text-white rounded-lg font-medium hover:bg-[#0e6001] transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ fontFamily: "Manrope" }}>
      <div className="bg-slate-50 px-4 md:px-8 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">
              Payments &amp; Receipts
            </h1>
            <p className="mt-1 text-sm font-normal text-slate-900">
              Manage student transactions, verify receipts, and track financial
              records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => handleExportCSV(rows)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer active:scale-95 transition-transform"
            >
              <img src={exportReport} alt="" className="h-4 w-5 shrink-0" />
              <span className="hidden sm:inline">Export Report</span>
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95 cursor-pointer active:scale-95 transition-transform"
            >
              <img src={recordPayment} alt="" className="h-4 w-5 shrink-0" />
              <span className="hidden sm:inline">Record Payment</span>
            </button>
          </div>
        </div>

        <div className="mt-6">
          <StatCards stats={stats} />
        </div>

        <div className="mt-6">
          <PaymentsTable
            rows={rows}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />
        </div>
      </div>

      <RecordPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
