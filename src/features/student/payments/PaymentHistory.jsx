import React from "react"
import { Filter, Download, Dot } from "lucide-react"

export default function PaymentHistory() {
  const payments = [
    { date: "Oct 24, 2023", refId: "REF-3833210", desc: "Fresher's Dues", amount: "₦3,000", status: "Successful" },
    { date: "Sep 12, 2023", refId: "REF-7742019", desc: "Tech Week Registration", amount: "₦1,500", status: "Successful" },
    { date: "Aug 05, 2023", refId: "REF-1102833", desc: "Exam Clearance Fee", amount: "₦500", status: "Failed" },
    { date: "Jan 15, 2023", refId: "REF-5693921", desc: "NACOS ID Card", amount: "₦1,000", status: "Successful" }
  ]

  const statusColor = (status) => status === "Successful" ? "text-green-600 border border-[#BBF7D0] bg-green-50" : status === "Failed" ? "text-red-600 border border-[#FECACA] bg-red-50" : "text-gray-600 bg-gray-50"

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
            {payments.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-[#475569] whitespace-nowrap">{p.date}</td>
                <td className="px-6 py-4 text-sm text-[#64748B] whitespace-nowrap">{p.refId}</td>
                <td className="px-6 py-4 text-sm text-[#0F172A] font-medium">{p.desc}</td>
                <td className="px-6 py-4 text-sm text-[#0F172A] font-medium whitespace-nowrap">{p.amount}</td>
                <td className="px-6 py-4 text-sm whitespace-nowrap flex justify-start">
                  <span className={`px-1 py-1/2 pr-3 rounded-full text-xs font-medium flex items-center ${statusColor(p.status)}`}>{p.status === "Successful"} <Dot size={30} className="-ml-1" /> {p.status}</span>
                </td>
                <td className="px-6 py-4 text-sm whitespace-nowrap">
                  {p.status === "Successful" ? (
                    <button className="text-[#94A3B8] hover:text-blue-700 font-medium flex items-center gap-1">PDF<Download className="w-3 h-3" /></button>
                  ) : (
                    <span className="text-[#CBD5E1]">No Receipt</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-6 py-4 border-t border-gray-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600 bg-gray-50">
          <p>Showing 1–4 of 12 transactions</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
