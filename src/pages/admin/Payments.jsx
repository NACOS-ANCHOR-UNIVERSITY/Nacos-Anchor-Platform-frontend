import { useMemo } from "react";
import { AdminTopbar, StatCards, PaymentsTable } from "../../features/admin/payments";
import { useAdminPayments } from "../../hooks";
import Skeleton from "../../components/ui/Skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";
import exportReport from "../../features/admin/payments/assets/icons/Export-report.png";
import recordPayment from "../../features/admin/payments/assets/icons/Record-payment.png";

/**
 * Get initials from full name
 */
const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function AdminPaymentsPage() {
  // Fetch admin payments data from API
  const { data: apiResponse, isLoading, error, refetch } = useAdminPayments();
  
  // Transform API metrics to stats format for StatCards
  const stats = useMemo(() => {
    const metrics = apiResponse?.data?.metrics;
    if (!metrics) return [];
    
    return [
      {
        label: "Total Revenue",
        value: metrics.total_revenue || "₦ 0",
        delta: "+12%",
        deltaLabel: "vs last month",
        deltaTone: "up",
      },
      {
        label: "Pending Approvals",
        value: String(metrics.pending_approvals || 0),
        delta: "-5%",
        deltaLabel: "vs last week",
        deltaTone: "down",
      },
      {
        label: "Approved Receipts",
        value: String(metrics.approved_receipts || 0),
        delta: "+8%",
        deltaLabel: "vs last month",
        deltaTone: "up",
      },
      {
        label: "Verification Rate",
        value: metrics.verification_rate || "0%",
        delta: "+2%",
        deltaLabel: "vs last month",
        deltaTone: "up",
      },
    ];
  }, [apiResponse]);
  
  // Transform API transactions to rows format for PaymentsTable
  const rows = useMemo(() => {
    const transactions = apiResponse?.data?.transactions;
    if (!transactions) return [];
    
    return transactions.map((t) => ({
      id: t.id,
      name: t.full_name,
      matric: t.matric_no,
      avatar: t.avatar_url?.startsWith("http") ? t.avatar_url : null,
      transaction: t.description,
      ref: t.reference_id,
      date: t.formatted_date,
      amount: t.formatted_amount,
      status: t.status === "Successful" ? "Approved" : t.status,
      initials: getInitials(t.full_name),
      avatarTone: "neutral",
    }));
  }, [apiResponse]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen" style={{ fontFamily: 'Manrope' }}>
        <div className="bg-slate-50 px-8 py-8">
          {/* Header skeleton */}
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
          
          {/* Stat cards skeleton */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
          
          {/* Table skeleton */}
          <div className="mt-6">
            <Skeleton className="h-96 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen" style={{ fontFamily: 'Manrope' }}>
        <div className="bg-slate-50 px-8 py-8">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Payments Data</h3>
            <p className="text-gray-500 mb-6 max-w-md">
              {error?.message || "Unable to fetch payment information. Please try again."}
            </p>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#138601] text-white rounded-lg font-medium hover:bg-[#0e6001] transition"
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
    <div className="min-h-screen" style={{ fontFamily: 'Manrope' }}>
      {/* <AdminTopbar /> */}

      <div className="bg-slate-50 px-8 py-8">
        {/* Page header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 ">Payments &amp; Receipts</h1>
            <p className="mt-1 text-sm font-normal text-slate-900">
              Manage student transactions, verify receipts, and track financial records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <img src={exportReport} alt="" className="h-4 w-5  shrink-0" />
              Export Report
            </button>

            <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-primary)] px-4 py-2 text-sm font-semibold text-white hover:opacity-95">
              <img src={recordPayment} alt="" className="h-4 w-5 shrink-0" />
              Record Payment
            </button>
          </div>

        </div>

        {/* Stat cards */}
        <div className="mt-6">
          <StatCards stats={stats} />
        </div>

        {/* Table */}
        <div className="mt-6">
          <PaymentsTable rows={rows} />
        </div>
      </div>
    </div>
  );
}
