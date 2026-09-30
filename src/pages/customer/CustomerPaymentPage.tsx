// src/pages/customer/PaymentsPage.tsx

import { useNavigate } from "react-router-dom";
import { FaLock, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import type { ReactElement } from "react";

export default function PaymentsPage(): ReactElement {
  const navigate = useNavigate();

  const amount = 15000;

  function handlePayment() {
    /**
     * TODO:
     * Integrate Razorpay / Stripe here
     * On success → generate QR & redirect
     */
    navigate("/customer/qr");
  }

  return (
    <div className="max-w-xl mx-auto p-4 pb-24 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Payment
        </h1>
        <p className="text-sm text-gray-500">
          Complete payment to generate your entry pass
        </p>
      </div>

      {/* Payment Summary */}
      <div className="bg-white border rounded-xl shadow-sm p-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Amount</span>
          <strong>₹ {amount.toLocaleString()}</strong>
        </div>

        <div className="text-xs text-gray-500">
          Demo payment only. Razorpay integration will be added.
        </div>

        <div className="flex items-center gap-2 text-xs text-green-600">
          <FaCheckCircle />
          Secure payment enabled
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 border rounded-lg p-3 text-xs text-gray-600">
        After successful payment, your QR Pass and Badge
        will be generated automatically.
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button
          onClick={handlePayment}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
        >
          <FaLock />
          Pay ₹ {amount.toLocaleString()}
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
