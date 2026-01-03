import React from "react"
import Sidebar from "../../../components/ui/Sidebar"
import WalletSummary from "../payments/WalletSummary"
import PaymentAlert from "../payments/PaymentAlert"
import PendingFees from "../payments/PendingFees"
import PaymentHistory from "../payments/PaymentHistory"
import PageHeader from "../../../components/ui/PageHeader"

export default function StudentPaymentReceipt() {
  return (
    <div className="flex min-h-screen bg-[#fcfcf8]">
      <Sidebar active="Payments" />
      <main className="flex-1">
        <PageHeader />
        <div className="flex justify-center">

          <div className=" container p-8">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <WalletSummary />
            </div>
            <PaymentAlert />
            <PendingFees />
            <PaymentHistory />
          </div>
        </div>
      </main>
    </div>
  )
}
