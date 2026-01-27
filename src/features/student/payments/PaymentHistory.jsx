import React, { useState } from "react"
import { Filter, Download, Dot, FileText } from "lucide-react"

/**
 * Payment History Component
 * Displays paginated payment history from API
 * 
 * @param {Object} props
 * @param {Array} props.payments - Array of payment history from API
 */
export default function PaymentHistory({ payments = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  // Calculate pagination
  const totalItems = payments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = payments.slice(startIndex, endIndex);
  
  // Format amount with currency
  const formatAmount = (amount, currency = "₦") => {
    if (!amount) return `${currency}0`;
    if (typeof amount === "string" && amount.includes(currency)) return amount;
    const numAmount = typeof amount === "string" ? parseFloat(amount.replace(/,/g, "")) : amount;
    return `${currency}${numAmount.toLocaleString()}`;
  };

  const statusColor = (status) => {
    const statusLower = (status || "").toLowerCase();
    if (statusLower === "successful" || statusLower === "success") {
      return "text-green-600 border border-[#BBF7D0] bg-green-50";
    }
    if (statusLower === "failed" || statusLower === "failure") {
      return "text-red-600 border border-[#FECACA] bg-red-50";
    }
    if (statusLower === "pending") {
      return "text-orange-600 border border-[#FED7AA] bg-orange-50";
    }
    return "text-gray-600 bg-gray-50";
  };

  // Check if payment was successful
  const isSuccessful = (status) => {
    const statusLower = (status || "").toLowerCase();
    return statusLower === "successful" || statusLower === "success";
  };

  // Empty state
  if (!payments || payments.length === 0) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-t-lg">
          <div className="flex items-center">
            <div className="w-1.5 h-7 rounded-lg bg-[#94A3B8]"></div>
            <h2 className="text-xl font-bold text-gray-900 pl-3">Payment History</h2>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-b-lg p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Payment History</h3>
          <p className="text-sm text-gray-500">Your payment transactions will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-t-lg">
        <div className="flex items-center">
          <div className="w-1.5 h-7 rounded-lg bg-[#94A3B8]">
          </div>
          <h2 className="text-xl font-bold text-gray-900 pl-3">Payment History</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-[#E2E8F0]"><Filter className="w-4 h-4" /></button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg border border-[#E2E8F0]"><Download className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 overflow-x-auto max-w-[calc(100vw-80px)] md:max-w-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reference ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPayments.map((p) => (
              <tr key={p.id || p.reference_id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-[#475569] whitespace-nowrap">{p.formatted_date || p.date_paid}</td>
                <td className="px-6 py-4 text-sm text-[#64748B] whitespace-nowrap">{p.reference_id}</td>
                <td className="px-6 py-4 text-sm text-[#0F172A] font-medium">{p.description}</td>
                <td className="px-6 py-4 text-sm text-[#0F172A] font-medium whitespace-nowrap">{formatAmount(p.amount)}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap flex justify-start">
                  <span className={`px-1 py-1/2 pr-3 rounded-full text-xs font-medium flex items-center ${statusColor(p.status)}`}>
                    <Dot size={30} className="-ml-1" /> {p.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {isSuccessful(p.status) && p.receipt_link ? (
                    <a 
                      href={p.receipt_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#94A3B8] hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      PDF<Download className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[#CBD5E1]">No Receipt</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 bg-gray-50">
          <p>Showing {startIndex + 1}–{Math.min(endIndex, totalItems)} of {totalItems} transactions</p>
          <div className="flex gap-2">
            <button 
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <button 
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

