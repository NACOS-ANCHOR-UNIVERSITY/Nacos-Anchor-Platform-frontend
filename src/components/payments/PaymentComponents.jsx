import React from "react";
import {PaystackButton} from "react-paystack";
import {toast} from "sonner";

// 1. Add 'onClose' to the props list
const PaymentComponent = ({
  amount,
  email,
  purpose,
  onSuccess,
  onClose,
  btnText,
  className,
}) => {
  const publicKey = "pk_live_779b7cc3646c8a0f1a076ae73d7f549671648e91";

  if (!publicKey) {
    console.error("Paystack public key is missing!");
    return (
      <button
        disabled
        className="bg-gray-400 text-white px-4 py-2 rounded text-xs"
      >
        Key Error
      </button>
    );
  }
  const cleanAmount = parseFloat(amount.toString().replace(/,/g, ""));
  const amountInKobo = cleanAmount * 100;

  const componentProps = {
    email,
    amount: amountInKobo,
    metadata: {
      custom_fields: [
        {
          display_name: "Payment For",
          variable_name: "payment_for",
          value: purpose,
        },
      ],
    },
    publicKey,
    text: btnText || "Pay Now",
    onSuccess: (reference) => {
      onSuccess(reference);
    },
    // 2. Use the passed prop, or fallback to a toast if none provided
    onClose: () => {
      if (onClose) {
        onClose();
      } else {
        toast.info("Payment cancelled");
      }
    },
  };

  return <PaystackButton {...componentProps} className={className} />;
};

export default PaymentComponent;
