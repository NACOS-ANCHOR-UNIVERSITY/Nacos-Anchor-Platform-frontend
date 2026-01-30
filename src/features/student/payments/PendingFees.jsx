import React from "react";
import {
  Tag,
  Shirt,
  ArrowRight,
  GraduationCap,
  PartyPopper,
  CreditCard,
  BookOpen,
  Ticket,
} from "lucide-react";
import PaymentComponent from "../../../components/payments/PaymentComponents";
import { toast } from "sonner";

const getFeeIcon = (title, type) => {
  const titleLower = (title || "").toLowerCase();

  if (titleLower.includes("dues") || titleLower.includes("departmental")) {
    return {
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    };
  }
  if (
    titleLower.includes("dinner") ||
    titleLower.includes("party") ||
    titleLower.includes("event")
  ) {
    return {
      icon: <PartyPopper className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    };
  }
  if (
    titleLower.includes("shirt") ||
    titleLower.includes("merchandise") ||
    titleLower.includes("cloth")
  ) {
    return {
      icon: <Shirt className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    };
  }
  if (titleLower.includes("ticket")) {
    return {
      icon: <Ticket className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100",
    };
  }
  if (titleLower.includes("book") || titleLower.includes("material")) {
    return {
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
      bg: "bg-indigo-100",
    };
  }
  return {
    icon: <CreditCard className="w-6 h-6 text-gray-600" />,
    bg: "bg-gray-100",
  };
};

const getBadgeStyle = (status) => {
  const statusUpper = (status || "").toUpperCase();

  if (statusUpper === "PENDING") {
    return "bg-amber-100 text-amber-700";
  }
  if (statusUpper === "OPTIONAL") {
    return "bg-gray-100 text-gray-600";
  }
  if (statusUpper === "NEW") {
    return "bg-green-100 text-green-700";
  }
  if (statusUpper === "URGENT") {
    return "bg-red-100 text-red-700";
  }
  return "bg-gray-100 text-gray-600";
};

export default function PendingFees({ fees = [] }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userEmail = user.email || "student@aul.edu.ng";
  const token = localStorage.getItem("token");

  const formatAmount = (amount, currency = "₦") => {
    if (!amount) return `${currency}0`;
    const numAmount =
      typeof amount === "string"
        ? parseFloat(amount.replace(/,/g, ""))
        : amount;
    return `${currency}${numAmount.toLocaleString()}`;
  };

  const getButtonProps = (fee) => {
    const type = (fee.type || "").toLowerCase();
    const buttonText = fee.button_text || "Pay Now";

    if (type === "compulsory" || type === "required") {
      return {
        text: buttonText,
        className:
          "min-w-[5rem] bg-[#138601] hover:bg-[#0e6001] shadow-[0px_2px_4px_-2px_#138601] hover:shadow-[0px_4px_6px_-1px_#138601] transition text-white py-2.5 px-4 rounded-lg text-sm font-medium cursor-pointer",
      };
    }
    return {
      text: buttonText,
      className:
        "min-w-[5rem] border border-gray-300 hover:bg-gray-50 transition py-2.5 px-4 rounded-lg text-sm font-medium cursor-pointer",
    };
  };

  const handlePaymentSuccess = async (reference, feeItem) => {
    toast.success(`Payment Successful! Verifying...`);
    console.log("Paystack Reference:", reference);

    try {
      const response = await fetch(
        "https://nacos.nextgenerationones.org/api/payments/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reference,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Database Updated: Payment Recorded!");
      } else {
        toast.error(
          "Payment received, but database update failed. Contact Admin.",
        );
        console.error("Verification failed:", data);
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("Network error verifying payment.");
    }
  };

  if (!fees || fees.length === 0) {
    return (
      <div className="mb-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <div className="flex items-center">
            <div className="w-1.5 h-7 rounded-lg bg-[#138601]"></div>
            <h2 className="text-xl font-bold text-gray-900 pl-3">
              Pending Fees
            </h2>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            All Caught Up!
          </h3>
          <p className="text-sm text-gray-500">
            You have no pending fees at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center">
          <div className="w-1.5 h-7 rounded-lg bg-[#138601]"></div>
          <h2 className="text-xl font-bold text-gray-900 pl-3">Pending Fees</h2>
        </div>
        {fees.length > 3 && (
          <button className="text-[#138601] text-sm hover:text-gray-900 font-medium self-start sm:self-auto flex justify-center items-center gap-2">
            View all <ArrowRight className="w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {fees.slice(0, 3).map((fee) => {
          const { icon, bg } = getFeeIcon(fee.title, fee.type);
          const badgeStyle = getBadgeStyle(fee.status_badge);
          const buttonProps = getButtonProps(fee);

          return (
            <div
              key={fee.id}
              className="relative bg-white border border-gray-200 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow"
            >
              <span
                className={`absolute top-4 right-4 ${badgeStyle} text-xs px-3 py-1 rounded-full font-bold`}
              >
                {fee.status_badge || "PENDING"}
              </span>
              <div
                className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4`}
              >
                {icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{fee.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {fee.description}
              </p>

              <div className="border-t border-gray-200 mt-6 pt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs tracking-wide text-gray-400 mb-1">
                    AMOUNT
                  </p>
                  <h4 className="text-2xl font-bold text-gray-900">
                    {formatAmount(fee.amount)}
                  </h4>
                </div>

                <PaymentComponent
                  amount={fee.amount}
                  email={userEmail}
                  purpose={fee.title}
                  btnText={buttonProps.text}
                  onSuccess={(ref) => handlePaymentSuccess(ref, fee)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
