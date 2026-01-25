import React, { useState } from "react";
import Sidebar from "../../../components/ui/Sidebar";
import WalletSummary from "../payments/WalletSummary";
import PaymentAlert from "../payments/PaymentAlert";
import PendingFees from "../payments/PendingFees";
import PaymentHistory from "../payments/PaymentHistory";
import PageHeader from "../../../components/ui/PageHeader";
import { useFinanceDashboard } from "../../../hooks";
import Skeleton from "../../../components/ui/Skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function StudentPaymentReceipt() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Fetch finance dashboard data from API
  const { data: apiResponse, isLoading, error, refetch } = useFinanceDashboard();
  
  // Extract data from API response
  const financeData = apiResponse?.data || {};
  const { overview, pending_fees, history } = financeData;

  // Loading state
  if (isLoading) {
    return (
      <main className="flex-1 relative">
        <div className="flex justify-center">
          <div className="container">
            {/* Wallet Summary Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="col-span-1 md:col-span-2 lg:col-span-3">
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
              </div>
              <Skeleton className="h-36 rounded-xl" />
              <Skeleton className="h-36 rounded-xl" />
              <Skeleton className="h-36 rounded-xl" />
            </div>
            {/* Pending Fees Skeleton */}
            <div className="mb-8">
              <Skeleton className="h-7 w-40 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-56 rounded-xl" />
                <Skeleton className="h-56 rounded-xl" />
                <Skeleton className="h-56 rounded-xl" />
              </div>
            </div>
            {/* Payment History Skeleton */}
            <Skeleton className="h-80 rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex-1 relative">
        <div className="flex justify-center">
          <div className="container">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to Load Payment Data</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                {error?.message || "Unable to fetch your payment information. Please try again."}
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
      </main>
    );
  }

  return (
    <main className="flex-1 relative">
      {/* <Sidebar {...{ isOpen, setIsOpen, active: "Payments" }} /> */}
      {/* <PageHeader {...{ isOpen, setIsOpen, location: "Payments" }} /> */}
      <div className="flex justify-center ">
        <div className=" container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <WalletSummary overview={overview} />
          </div>
          <PaymentAlert />
          <PendingFees fees={pending_fees} />
          <PaymentHistory payments={history} />
        </div>
      </div>
    </main>
  );
}

