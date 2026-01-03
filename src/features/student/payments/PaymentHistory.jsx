import React from "react"
import { Filter, Download, Badge } from "lucide-react"

export default function PaymentHistory() {
  const payments = [
    { date: "Oct 24, 2023", refId: "REF-3833210", desc: "Fresher's Dues", amount: "₦3,000", status: "Successful" },
    { date: "Sep 12, 2023", refId: "REF-7742019", desc: "Tech Week Registration", amount: "₦1,500", status: "Successful" },
    { date: "Aug 05, 2023", refId: "REF-1102833", desc: "Exam Clearance Fee", amount: "₦500", status: "Failed" },
    { date: "Jan 15, 2023", refId: "REF-5693921", desc: "NACOS ID Card", amount: "₦1,000", status: "Successful" }
  ]

  const statusColor = (status) => status === "Successful" ? "text-green-600 bg-green-50" : status === "Failed" ? "text-red-600 bg-red-50" : "text-gray-600 bg-gray-50"

  return (
    <div>
      <div className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-t-lg">
        <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3">Payment History</h2>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"><Filter className="w-4 h-4" /></button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"><Download className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="bg-white border border-gray-200  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
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
                  <td className="px-6 py-4 text-sm text-gray-900">{p.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.refId}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{p.desc}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{p.amount}</td>
                  <td className="px-6 py-4 text-sm"><span className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColor(p.status)}`}>{p.status === "Successful" && "✓ "} {p.status}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {p.status === "Successful" ? <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">PDF<Download className="w-3 h-3" /></button> : <span className="text-gray-400">No Receipt</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600 bg-gray-50">
          <p>Showing 1-4 of 12 transactions</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
