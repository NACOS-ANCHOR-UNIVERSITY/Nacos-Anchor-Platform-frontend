import { useMemo, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Eye,
  Check,
} from "lucide-react";
import TableToolbar from "./TableToolbar";
import { toast } from "sonner";
import { useVerifyPayment } from "../../../../hooks/useAdmin";

function StatusPill({ status }) {
  const styles = useMemo(() => {
    switch (status) {
      case "Approved":
      case "Successful":
        return "bg-green-100 text-green-700";
      case "Rejected":
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  }, [status]);

  return (
    <span
      className={`rounded-md px-2 py-1 text-[11px] font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}

function Avatar({ src, initials, tone }) {
  if (src) {
    return (
      <img src={src} alt="" className="h-7 w-7 rounded-full object-cover" />
    );
  }

  const toneStyles = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-rose-50 text-rose-600",
    neutral: "bg-slate-100 text-slate-600",
  };

  return (
    <div
      className={[
        "grid h-7 w-7 place-items-center rounded-full text-xs font-bold",
        toneStyles[tone] || toneStyles.neutral,
      ].join(" ")}
    >
      {initials}
    </div>
  );
}

const ITEMS_PER_PAGE = 10;

export default function PaymentsTable({
  rows = [],
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}) {
  const [selected, setSelected] = useState(() => new Set());
  const [verifying, setVerifying] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    payment: null,
  });

  const { mutate: verifyPayment } = useVerifyPayment();

  const totalRows = rows.length;
  const totalPages = Math.ceil(totalRows / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalRows);
  const paginatedRows = rows.slice(startIndex, endIndex);

  const openConfirmModal = (payment) => {
    setConfirmModal({ open: true, payment });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ open: false, payment: null });
  };

  const handleVerify = (id, status) => {
    setVerifying(id);
    const action = status === "approved" ? "Approve" : "Reject";

    verifyPayment(
      { id, status },
      {
        onSuccess: () => {
          toast.success(`Payment ${action}d successfully`);
          setVerifying(null);
          closeConfirmModal();
        },
        onError: () => {
          toast.error(`Failed to ${action} payment`);
          setVerifying(null);
        },
      },
    );
  };

  function toggleOne(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => {
      if (prev.size === paginatedRows.length) return new Set();
      return new Set(paginatedRows.map((r) => r.id));
    });
  }

  const selectedCount = selected.size;

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <TableToolbar
          selectedCount={selectedCount}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white">
              <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3 w-10">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={
                      paginatedRows.length > 0 &&
                      selectedCount === paginatedRows.length
                    }
                    onChange={toggleAll}
                  />
                </th>
                <th className="px-5 py-3">Student Details</th>
                <th className="px-5 py-3">Transaction</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedRows.map((r) => (
                <tr key={r.id} className="border-b border-slate-100">
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={selected.has(r.id)}
                      onChange={() => toggleOne(r.id)}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={r.avatar}
                        initials={r.initials}
                        tone={r.avatarTone}
                      />

                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          Matric: {r.matric}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-slate-900">
                      {r.transaction}
                    </div>
                    <div className="text-xs text-slate-500">Ref: {r.ref}</div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-700">{r.date}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    {r.amount}
                  </td>

                  <td className="px-5 py-4">
                    <StatusPill status={r.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-slate-500" />
                      </button>

                      {r.status === "Pending" ? (
                        <button
                          onClick={() => openConfirmModal(r)}
                          disabled={verifying === r.id}
                          className="p-1.5 hover:bg-green-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                          title="Approve"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </button>
                      ) : (
                        <button
                          className="p-1.5 opacity-50 cursor-default"
                          title={r.status}
                        >
                          <Check className="h-4 w-4 text-slate-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer with Dynamic Pagination */}
        <div className="flex items-center justify-between px-5 py-4 text-xs text-slate-500">
          <div>
            Showing {totalRows === 0 ? 0 : startIndex + 1} to {endIndex} of{" "}
            {totalRows} results
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-md p-2 hover:bg-slate-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-2">
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`rounded-md px-3 py-1.5 cursor-pointer transition-colors ${
                      currentPage === page
                        ? "bg-brand-primary text-white"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded-md p-2 hover:bg-slate-100 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.open && confirmModal.payment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-slate-900 font-bold text-lg">
                Verify Payment
              </h3>
              <button
                onClick={closeConfirmModal}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="size-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500">
                  <AlertTriangle size={28} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-lg">
                    Confirm Payment Action
                  </p>
                  <p className="text-slate-500 text-sm mt-2">
                    You are about to verify the payment for{" "}
                    <span className="font-bold text-slate-700">
                      {confirmModal.payment.name}
                    </span>{" "}
                    of{" "}
                    <span className="font-bold text-slate-700">
                      {confirmModal.payment.amount}
                    </span>
                  </p>
                  <p className="text-slate-400 text-xs mt-1">
                    Ref: {confirmModal.payment.ref}
                  </p>
                </div>

                <div className="flex gap-3 w-full mt-4">
                  <button
                    onClick={() =>
                      handleVerify(confirmModal.payment.id, "rejected")
                    }
                    disabled={verifying === confirmModal.payment.id}
                    className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    {verifying === confirmModal.payment.id ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <>
                        <XCircle size={16} />
                        Reject
                      </>
                    )}
                  </button>
                  <button
                    onClick={() =>
                      handleVerify(confirmModal.payment.id, "approved")
                    }
                    disabled={verifying === confirmModal.payment.id}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    {verifying === confirmModal.payment.id ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        Approve
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
