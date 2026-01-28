import React from 'react';
import { PaystackButton } from 'react-paystack';
import { toast } from 'sonner';

const PaymentComponent = ({ amount, email, purpose, onSuccess, btnText, className }) => {
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
        console.error("Paystack public key is missing!");
        return <button disabled className="bg-gray-400 text-white px-4 py-2 rounded text-xs">Key Error</button>;
    }

    // Ensure amount is a clean number (remove commas)
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
            // We use the className prop so it looks EXACTLY like your design
            className={className}
        />
    );
};

export default PaymentComponent;