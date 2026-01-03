import React from "react"
import { Tag, Shirt, Badge } from "lucide-react"

export default function PendingFees() {
  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray border-l-4 border-green-600 pl-3">Pending Fees</h2>
        <button className="text-[#138601] text-sm hover:text-gray-900 font-medium">View all →</button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="relative bg-white border border-gray-200 rounded-xl p-6">
          {/* Badge */}
          <span className="absolute top-4 right-4 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-medium">
            PENDING
          </span>

          {/* Icon */}
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Tag className="w-6 h-6 text-blue-600" />
          </div>

          <h3 className="font-semibold text-gray-900 mb-1">
            Departmental Dues
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Annual departmental levy for the 2023/2024 academic session.
          </p>

          <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs tracking-wide text-gray-400 mb-1">AMOUNT</p>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                ₦2,000
              </h4>
            </div>


            <button className="w-20 bg-[#138601] hover:bg-[#138601] shadow-[0px_2px_4px_-2px_#138601] hover:shadow-[0px_4px_6px_-1px_#138601] transition-shadow duration-200 transition text-white py-2.5 rounded-lg text-sm font-medium">
              Pay Now
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white border border-gray-200 rounded-xl p-6">
          <span className="absolute top-4 right-4 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium">
            OPTIONAL
          </span>

          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <span className="text-xl">🎟️</span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-1">
            Dinner Night Ticket
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Exclusive access ticket for the NACOS Annual Dinner & Award Night.
          </p>

          <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs tracking-wide text-gray-400 mb-1">AMOUNT</p>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                ₦5,000
              </h4>
            </div>

            <button className="w-20 border border-gray-300 hover:bg-gray-50 transition py-2.5 rounded-lg text-sm font-medium">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white border border-gray-200 rounded-xl p-6">
          <span className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
            NEW
          </span>

          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Shirt className="w-6 h-6 text-green-600" />
          </div>

          <h3 className="font-semibold text-gray-900 mb-1">
            Departmental T-Shirt
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Official NACOS merchandise. 100% Cotton. Available in multiple sizes.
          </p>

          <div className="border-t border-gray-200 mt-6 pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs tracking-wide text-gray-400 mb-1">AMOUNT</p>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                ₦4,500
              </h4>
            </div>

            <button className="w-20 border border-gray-300 hover:bg-gray-50 transition py-2.5 rounded-lg text-sm font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
