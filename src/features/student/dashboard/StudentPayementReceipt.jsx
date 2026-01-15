import React from "react";
import WalletSummary from "../payments/WalletSummary";
import PaymentAlert from "../payments/PaymentAlert";
import PendingFees from "../payments/PendingFees";
import PaymentHistory from "../payments/PaymentHistory";

export default function StudentPaymentReceipt() {
  return (
    <main className="flex-1 relative">
      {/* <Sidebar {...{ isOpen, setIsOpen, active: "Payments" }} /> */}
      {/* <PageHeader {...{ isOpen, setIsOpen, location: "Payments" }} /> */}
      <div className="flex justify-center ">
        <div className=" container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <WalletSummary />
          </div>
          <PaymentAlert />
          <PendingFees />
          <PaymentHistory />
        </div>
      </div>
    </main>
  );
}

