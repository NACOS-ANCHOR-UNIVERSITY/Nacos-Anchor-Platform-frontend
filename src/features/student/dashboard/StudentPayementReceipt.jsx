import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/ui/Sidebar";
import WalletSummary from "../payments/WalletSummary";
import PaymentAlert from "../payments/PaymentAlert";
import PendingFees from "../payments/PendingFees";
import PaymentHistory from "../payments/PaymentHistory";
import PageHeader from "../../../components/ui/PageHeader";
import Skeleton from "../../../components/ui/Skeleton";
import { AlertCircle, RefreshCw } from "lucide-react";

const BASE_URL = "https://nacos.nextgenerationones.org/api";

export default function StudentPaymentReceipt() {
  const [isOpen, setIsOpen] = useState(false);
  const [financeData, setFinanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token")
  console.log(financeData)

  const fetchFinanceData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/finance/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header if needed
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success') {
        setFinanceData(result.data);
      } else {
        throw new Error('Failed to fetch finance data');
      }
    } catch (err) {
      setError(err);
      console.error('Error fetching finance data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  // Extract data from state
  const overview = financeData?.overview || {};
  const pending_fees = financeData?.pending_fees || [];
  const history = financeData?.history || [];

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
                onClick={fetchFinanceData}
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
      <div className="flex justify-center">
        <div className="container">
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