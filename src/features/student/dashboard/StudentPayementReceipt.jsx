import React, { useState } from "react"
import Sidebar from "../../../components/ui/Sidebar"
import WalletSummary from "../payments/WalletSummary"
import PaymentAlert from "../payments/PaymentAlert"
import PendingFees from "../payments/PendingFees"
import PaymentHistory from "../payments/PaymentHistory"
import PageHeader from "../../../components/ui/PageHeader"

export default function StudentPaymentReceipt() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#fcfcf8]">
      <Sidebar {...{ isOpen, setIsOpen, active: "Payments" }} />
      <main className="flex-1 relative">
        <PageHeader {...{ isOpen, setIsOpen, }} />
        <div className="flex justify-center ">

          <div className=" container p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
