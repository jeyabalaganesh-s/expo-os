// src/pages/customer/BookingSummaryPage.tsx

import { useLocation, useNavigate } from "react-router-dom";
import {
  FaStore,
  FaThLarge,
  FaRulerCombined,
  FaFileInvoice,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

/* ===============================
   Types
================================ */
type BookingState = {
  businessName: string;
  category: string;
  gst?: string;
  stall: {
    id: string;
    width: number;
    height: number;
    price: number;
  };
};

export default function BookingSummaryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as BookingState | null;

  // Safety guard (deep link protection)
  if (!state) {
    navigate("/customer/booking");
    return null;
  }

  const { stall, businessName, gst, category } = state;
  const areaSqm = stall.width * stall.height;

  return (
    <div className="max-w-3xl mx-auto p-4 pb-24 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Booking Summary
        </h1>
        <p className="text-sm text-gray-500">
          Review your booking details before payment
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border rounded-xl shadow-sm divide-y">
        {/* Business Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <FaStore className="text-gray-400" />
            <span className="font-medium">{businessName}</span>
          </div>
          <div className="text-xs text-gray-500">
            Category: {category}
          </div>
          <div className="text-xs text-gray-500">
            GST: {gst || "—"}
          </div>
        </div>

        {/* Stall Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <FaThLarge className="text-gray-400" />
            <span>
              Stall <b>{stall.id}</b>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FaRulerCombined className="text-gray-400" />
            Size: {stall.width}m × {stall.height}m ({areaSqm} sqm)
          </div>
        </div>

        {/* Payment Info */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <FaFileInvoice className="text-gray-400" />
            Total Amount
          </div>
          <div className="text-lg font-semibold text-gray-900">
            ₹ {stall.price.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm"
        >
          <FaArrowLeft />
          Back
        </button>

        <button
          onClick={() => navigate("/customer/payments")}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition"
        >
          Proceed to Payment
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
