import { AdminTopbar, StatCards, PaymentsTable, mockPayments, mockStats } from "../../features/admin/payments";
import exportReport from "../../features/admin/payments/assets/icons/Export-report.png";
import recordPayment from "../../features/admin/payments/assets/icons/Record-payment.png";

export default function AdminPaymentsPage() {
  return (
    <div className="min-h-screen">
      <AdminTopbar />

      <div className="bg-slate-50 px-8 py-8">
        {/* Page header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Payments &amp; Receipts</h1>
            <p className="mt-1 text-sm text-slate-600">
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
          <StatCards stats={mockStats} />
        </div>

        {/* Table */}
        <div className="mt-6">
          <PaymentsTable rows={mockPayments} />
        </div>
      </div>
    </div>
  );
}
