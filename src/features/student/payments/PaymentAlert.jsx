import { ArrowRight } from "lucide-react"
import React from "react"

export default function PaymentAlert() {
  return (
    <div className="mb-8 bg-orange-50 border border-orange-200 rounded-lg p-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4">
      <div className="flex items-start gap-4 flex-1">
        <div className="flex-shrink-0 mt-0.5">
          <span className="text-2xl">⚠️</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">Payment Action Required</h4>
          <p className="text-sm text-gray-700 mt-1">You have 1 pending compulsory payment (Departmental Dues) that requires attention.</p>
        </div>
      </div>

      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium self-start sm:self-auto  flex justify-center items-center gap-2">
        Pay Now <ArrowRight className="w-4"/>
      </button>
    </div>
  )
}
