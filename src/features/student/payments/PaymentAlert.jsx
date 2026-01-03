import React from "react"
import { AlertTriangle } from "lucide-react"

export default function PaymentAlert() {
  return (
    <div className="mb-8 bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-4">
      <div className="flex-shrink-0 mt-0.5">
        <span className="text-2xl">⚠️</span>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900">Payment Action Required</h4>
        <p className="text-sm text-gray-700 mt-1">
          You have 1 pending compulsory payment (Departmental Dues) that requires attention.
        </p>
      </div>
      <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex-shrink-0">
        Pay Now →
      </button>
    </div>
  )
}
