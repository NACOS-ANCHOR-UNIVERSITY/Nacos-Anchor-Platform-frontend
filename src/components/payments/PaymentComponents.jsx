import React from 'react';
import { PaystackButton } from 'react-paystack';
import { toast } from 'sonner';

const PaymentComponent = ({ amount, email, purpose, onSuccess, btnText, className }) => {
    console.log("amount", amount)
    const publicKey = 'pk_live_20e73efe6055558e21bb03bf15b1224607c0398e'; //<-- Judes key
    // const publicKey = 'pk_live_779b7cc3646c8a0f1a076ae73d7f549671648e91'; //<--- we should probably let this come from env or the backend....
    // const publicKey = 'pk_test_b8b0d9577163a02f73b9362d2a64f0f637cffa1c'; //<--- we should probably let this come from env or the backend....

    if (!publicKey) {
        console.error("Paystack public key is missing!");
        return <button disabled className="bg-gray-400 text-white px-4 py-2 rounded text-xs">Key Error</button>;
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
            // We use the className prop so it looks EXACTLY like your design
            className={className}
        />
        // <div className='flex cursor-pointer' onClick={()=>{
        //     toast.info("Down for maintenance")
        // }}>
        //     Pay now
        // </div>
    );
};

export default PaymentComponent;