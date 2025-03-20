import { Inter } from "next/font/google";
import Image from "next/image";
import React, { useState } from "react";
import jsPDF from "jspdf";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const PaymentDetailModal = ({ payment, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const paymentMethods = {
    BCA: "1234 5678 9101 1121",
    BRI: "9876 5432 1098 7654",
  };

  if (!payment) return null;

  // 📌 Generate PDF Receipt
  const downloadReceipt = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");

    // 📝 Title
    doc.setFontSize(18);
    doc.text("Payment Receipt", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // 📄 Payment Details
    doc.text(`Payment ID: ${payment.paymentId}`, 20, 40);
    doc.text(`Payment Name: ${payment.paymentName}`, 20, 50);
    doc.text(`Amount: ${payment.amount}`, 20, 60);
    doc.text(`Status: ${payment.paymentStatus}`, 20, 70);
    doc.text(`Description: ${payment.description}`, 20, 80);

    // 🏦 Payment Method (if selected)
    if (selectedMethod) {
      doc.text(`Payment Method: ${selectedMethod}`, 20, 90);
      doc.text(`VA Number: ${paymentMethods[selectedMethod]}`, 20, 100);
    }

    // 📅 Date
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 120);

    // 📥 Save PDF
    doc.save(`receipt_${payment.paymentId}.pdf`);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm ${inter.variable} font-sans`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="flex justify-center items-center text-xl font-bold pb-3 italic">
          PAYMENT DETAIL
        </h2>
        <p className="flex flex-col">
          <strong>Payment ID:</strong> {payment.paymentId}
        </p>
        <p className="flex flex-col">
          <strong>Payment Name:</strong> {payment.paymentName}
        </p>
        <p className="flex flex-col">
          <strong>Amount:</strong> {payment.amount}
        </p>
        <p className="flex flex-col">
          <strong>Status:</strong> {payment.paymentStatus}
        </p>
        <p className="flex flex-col">
          <strong>Description:</strong> {payment.description}
        </p>

        {payment.paymentStatus === "COMPLETED" ? (
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1 className="text-green-600 text-lg font-bold text-center mt-4">
              ✅ Already Paid
            </h1>
            <button
              onClick={downloadReceipt}
              className="flex bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded-lg px-4 py-2 font-bold"
            >
              Download Receipt
            </button>
          </div>
        ) : (
          <>
            {/* Payment Method Selection */}
            <div className="mt-4">
              <h3 className="text-md font-bold mb-2">Choose Payment Method:</h3>
              <div className="flex flex-col gap-4">
                <button
                  className={`px-4 h-10 rounded flex justify-center items-center ${
                    selectedMethod === "BCA"
                      ? "bg-gray-300 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedMethod("BCA")}
                >
                  <span>
                    <Image
                      src={
                        "https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-BCA-PNG.png"
                      }
                      alt="bca"
                      width={70}
                      height={70}
                    />
                  </span>
                </button>
                <button
                  className={`px-4 h-10 rounded flex justify-center items-center ${
                    selectedMethod === "BRI"
                      ? "bg-gray-300 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedMethod("BRI")}
                >
                  <span>
                    <Image
                      src={
                        "https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-Bank-BRI.png"
                      }
                      alt="bri"
                      width={60}
                      height={60}
                    />
                  </span>
                </button>
              </div>
            </div>

            {/* Display VA Number when a method is selected */}
            {selectedMethod && (
              <div className="mt-4 text-red-600 flex gap-2 justify-center">
                <h3 className="text-sm font-semibold">
                  Virtual Account Number:{" "}
                </h3>
                <p className="text-sm font-bold">
                  {paymentMethods[selectedMethod]}
                </p>
              </div>
            )}
          </>
        )}

        {/* Close Button */}
        <div className="mt-6 flex justify-between items-end">
          <p className="text-sm">*After payment, please contact admin</p>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailModal;
