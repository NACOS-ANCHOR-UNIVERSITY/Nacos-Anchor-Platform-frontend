import { useEffect, useRef } from "react";
import { X, Download, Printer } from "lucide-react";

export default function Receipt({ receipt, onClose }) {
    const receiptRef = useRef(null);

    // Format the date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Format currency
    const formatCurrency = (amount) => {
        return `₦${amount.toFixed(2)}`;
    };

    // Auto-trigger print dialog when receipt data loads


    const handlePrint = () => {
        if (!receiptRef.current) return;

        // Create a new window for printing
        const printWindow = window.open('', '', 'width=800,height=600');
        
        // Write the receipt content to the new window
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Payment Receipt</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        @media print {
                            @page {
                                margin: 0.5in;
                            }
                            body {
                                -webkit-print-color-adjust: exact;
                                print-color-adjust: exact;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${receiptRef.current.innerHTML}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        
        // Wait for content to load, then print
        printWindow.onload = function() {
            printWindow.focus();
            printWindow.print();
            setTimeout(()=>{
                
                printWindow.close();
            },500)
        };
    };

    const handleDownloadPDF = () => {
        handlePrint();
    };

    // Don't render if no receipt data
    if (!receipt?.data) {
        return null;
    }

    return (
        <>
            {/* Backdrop overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 print:hidden">
                <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto relative">
                    {/* Action buttons - hidden when printing */}
                    <div className="absolute top-4 right-4 flex gap-2 print:hidden z-10">
                        <button
                            onClick={handlePrint}
                            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-lg"
                            title="Print Receipt"
                        >
                            <Printer className="w-5 h-5" />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 shadow-lg"
                            title="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Receipt content - this will be printed */}
                    <div ref={receiptRef}>
                        {/* Header with Logo */}
                        <div className="bg-green-600 p-12 text-center">
                            <div className="inline-block bg-white rounded-full p-6 mb-4">
                                <svg
                                    className="w-24 h-24 text-green-600"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Circuit board style logo */}
                                    <circle cx="50" cy="30" r="4" fill="currentColor" />
                                    <circle cx="35" cy="50" r="4" fill="currentColor" />
                                    <circle cx="50" cy="50" r="4" fill="currentColor" />
                                    <circle cx="65" cy="50" r="4" fill="currentColor" />
                                    <circle cx="30" cy="70" r="4" fill="currentColor" />
                                    <circle cx="50" cy="70" r="4" fill="currentColor" />
                                    <circle cx="70" cy="70" r="4" fill="currentColor" />

                                    <line x1="50" y1="30" x2="35" y2="50" stroke="currentColor" strokeWidth="2" />
                                    <line x1="50" y1="30" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />
                                    <line x1="50" y1="30" x2="65" y2="50" stroke="currentColor" strokeWidth="2" />

                                    <line x1="35" y1="50" x2="30" y2="70" stroke="currentColor" strokeWidth="2" />
                                    <line x1="50" y1="50" x2="50" y2="70" stroke="currentColor" strokeWidth="2" />
                                    <line x1="65" y1="50" x2="70" y2="70" stroke="currentColor" strokeWidth="2" />

                                    <path
                                        d="M 20 85 Q 50 75 80 85"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-white text-3xl font-bold mb-2">NACOS AUL</h1>
                            <p className="text-white text-lg opacity-90">Payment Receipt</p>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {/* Success Message */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful</h2>
                                <p className="text-gray-600">
                                    Hello <span className="font-semibold">{receipt?.data?.user?.full_name}</span>,
                                </p>
                                <p className="text-gray-600 mt-2">
                                    We have received your payment successfully.
                                </p>
                            </div>

                            {/* Payment Details */}
                            <div className="space-y-4 border-t border-gray-200 pt-6">
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Reference</span>
                                    <span className="text-gray-900 font-semibold">
                                        {receipt?.data?.reference_id}
                                    </span>
                                </div>

                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Description</span>
                                    <span className="text-gray-900 font-semibold">
                                        {receipt?.data?.description}
                                    </span>
                                </div>

                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Date Paid</span>
                                    <span className="text-gray-900 font-semibold">
                                        {receipt?.data?.date_paid && formatDate(receipt.data.date_paid)}
                                    </span>
                                </div>

                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-600 font-medium">Status</span>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                        {receipt?.data?.status}
                                    </span>
                                </div>

                                {/* Amount - Highlighted */}
                                <div className="flex justify-between py-4 bg-gray-50 px-4 rounded-lg mt-4">
                                    <span className="text-gray-700 font-bold text-lg">Amount</span>
                                    <span className="text-green-600 font-bold text-2xl">
                                        {receipt?.data?.amount && formatCurrency(receipt.data.amount)}
                                    </span>
                                </div>
                            </div>

                            {/* Footer Note */}
                            <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">Note:</span> Please keep this receipt for your records.
                                    For any inquiries, contact NACOS AUL support.
                                </p>
                            </div>

                            {/* Print timestamp */}
                            <div className="mt-6 text-center text-xs text-gray-500">
                                <p>Printed on {new Date().toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom action buttons - hidden when printing */}
                    <div className="px-8 pb-6 flex gap-3 print:hidden">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                        >
                            Close
                        </button>
                        <button
                            onClick={handlePrint}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
                        >
                            <Download className="w-4 h-4" />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}