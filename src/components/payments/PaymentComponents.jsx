import React from 'react';
import { PaystackButton } from 'react-paystack';
import { toast } from 'sonner';

const PaymentComponent = ({ amount, email, purpose, onSuccess, btnText, className, disabled }) => {
    console.log("amount", amount)
    const publicKey = 'pk_live_20e73efe6055558e21bb03bf15b1224607c0398e';

    if (!publicKey) {
        console.error("Paystack public key is missing!");
        return <button disabled className="bg-gray-400 text-white px-4 py-2 rounded text-xs">Key Error</button>;
    }

    // If disabled, render a plain button instead of Paystack
    if (disabled) {
        return (
            <button
                disabled
                className={className}
            >
                {btnText || "Paid"}
            </button>
        );
    }

    const cleanAmount = parseFloat(amount.toString().replace(/,/g, ''));
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
        onClose: () => toast.info("Payment cancelled"),
    };

    return (
        <PaystackButton
            {...componentProps}
            className={className}
        />
    );
};

export default PaymentComponent;