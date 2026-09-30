// src/pages/customer/PaymentSummaryPage.tsx

import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaFileDownload,
  FaArrowLeft,
} from "react-icons/fa";

/* ===============================
   Types
================================ */
type Payment = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending";
  method?: string;
  transactionId?: string;
};

/* TEMP DATA (replace with API later) */
const PAYMENTS: Payment[] = [
  {
    id: "PAY-001",
    date: "01 Feb 2025",
    description: "Stall Booking – A12",
    amount: 50000,
    status: "paid",
    method: "UPI",
    transactionId: "TXN9823749823",
  },
  {
    id: "PAY-002",
    date: "05 Feb 2025",
    description: "Electricity Charges",
    amount: 5000,
    status: "pending",
  },
];

export default function PaymentSummaryPage() {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const location = useLocation();

  const payment =
    PAYMENTS.find((p) => p.id === paymentId) ||
    (location.state as Payment | null);

  if (!payment) {
    navigate("/customer/payments");
    return null;
  }

  function downloadReceipt() {
    /**
     * TODO:
     * Replace with real PDF generation
     * (backend or jsPDF)
     */
    alert("Receipt downloaded (demo)");
  }

  return (
    <div className="max-w-xl mx-auto p-4 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600"
        >
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Payment Receipt
          </h1>
          <p className="text-sm text-gray-500">
            Payment ID: {payment.id}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2 text-green-700 text-sm">
        <FaCheckCircle />
        Payment Successful
      </div>

      {/* Receipt Card */}
      <div className="bg-white border rounded-xl shadow-sm divide-y">
        <div className="p-4 space-y-2">
          <div className="text-sm text-gray-500">Description</div>
          <div className="font-medium">
            {payment.description}
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-gray-500">Date</div>
            <div>{payment.date}</div>
          </div>

          <div>
            <div className="text-gray-500">Method</div>
            <div>{payment.method || "—"}</div>
          </div>

          <div>
            <div className="text-gray-500">Transaction ID</div>
            <div className="break-all">
              {payment.transactionId || "—"}
            </div>
          </div>

          <div>
            <div className="text-gray-500">Amount</div>
            <div className="font-semibold">
              ₹ {payment.amount.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button
          onClick={downloadReceipt}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
        >
          <FaFileDownload />
          Download Receipt
        </button>
      </div>
    </div>
  );
}
