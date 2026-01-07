import { PrinterIcon } from "lucide-react"
import React from "react"
import vault from "../../../assets/images/bankVaut.png"
import lilpiggy from "../../../assets/images/lilpiggy.png"

export default function WalletSummary() {
  return (
    <>
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#000000]">Payments & Receipts</h1>
          <p className="mt-1 text-sm text-[#64748B] max-w-xl">Manage departmental dues, track history, and download  receipts.</p>
        </div>
        <button className="flex items-center gap-2 px-5 h-11 rounded-xl border border-gray-200 bg-white text-[#64748B] font-semibold shadow-sm hover:bg-gray-50 hover:border-gray-300 hover:shadow-md active:scale-[0.98] transition-all duration-200">
          <PrinterIcon className="w-5 h-5" />
          Statement
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#64748B] uppercase tracking-wide font-bold mb-2 ">Total Paid</p>
          <div className="flex items-end gap-3 mb-3">
            <h3 className="text-3xl font-bold text-[#000000]">₦45,000</h3>
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-lg">Paid</span>
          </div>
        </div>
        <p className="text-xs text-[#64748B]">Current Session 2023/2024</p>
      </div>

      <div className="bg-white border border-[#FED7AA] rounded-xl p-6 flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#64748B] uppercase tracking-wide font-bold mb-2 ">Outstanding Dues</p>
          <h3 className="text-3xl font-bold text-orange-600 mb-3">₦7,000</h3>
        </div>
        <p className="text-xs text-red-500 font-medium"><span className="text-[#64748B]">Due by</span> Nov 30, 2023</p>
      </div>

      <div className="relative overflow-hidden rounded-xl p-6 text-white bg-gradient-to-r from-[#138601] to-[#0E6001] sm:col-span-1 md:col-span-2 lg:col-span-1">
        <p className="text-xs text-green-100 uppercase tracking-wide font-medium mb-2">Wallet Balance</p>
        <h3 className="text-3xl font-bold mb-4">₦1,200</h3>
        <div className="flex gap-2 relative z-10">
          <button className="bg-white text-green-700 hover:bg-gray-100 px-4 py-2 rounded-md text-xs font-semibold">Top Up</button>
          <button className="border border-white/70 hover:bg-white/10 px-4 py-2 rounded-md text-xs font-semibold">Transfer</button>
        </div>
        <img src={vault} alt="" className="absolute top-5 right-5 w-5 opacity-90" />
        <img src={lilpiggy} alt="" className="absolute right-2 bottom-0 w-32 opacity-80 pointer-events-none" />
      </div>
    </>
  )
}
