// src/pages/customer/PaymentsPage.tsx

import {
  FaClock,
  FaArrowRight,
  FaFileInvoice,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { ReactElement } from "react";

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
};

const PAYMENTS: Payment[] = [
  {
    id: "PAY-001",
    date: "01 Feb 2025",
    description: "Stall Booking – A12",
    amount: 50000,
    status: "paid",
    method: "UPI",
  },
  {
    id: "PAY-002",
    date: "05 Feb 2025",
    description: "Electricity Charges",
    amount: 5000,
    status: "pending",
  },
];

export default function PaymentsPage(): ReactElement {
  const navigate = useNavigate();

  const total = PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const paid = PAYMENTS.filter((p) => p.status === "paid").reduce(
    (s, p) => s + p.amount,
    0
  );
  const balance = total - paid;

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-4 pb-24">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">
          Payments
        </h1>
        <p className="text-sm text-gray-500">
          View your payment summary and transaction history
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Total Amount"
          value={`₹ ${total.toLocaleString()}`}
        />
        <SummaryCard
          label="Paid"
          value={`₹ ${paid.toLocaleString()}`}
          color="green"
        />
        <SummaryCard
          label="Balance"
          value={`₹ ${balance.toLocaleString()}`}
          color="orange"
        />
      </div>

      {/* Payment History */}
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-medium">Payment History</h2>
        </div>

        <ul className="divide-y">
          {PAYMENTS.map((p) => (
            <li
              key={p.id}
              className="p-4 flex justify-between items-start gap-4"
            >
              {/* Left */}
              <div>
                <div className="font-medium text-sm">
                  {p.description}
                </div>
                <div className="text-xs text-gray-500">
                  {p.date}
                  {p.method && ` • ${p.method}`}
                </div>
              </div>

              {/* Right */}
              <div className="text-right space-y-2">
                <div className="font-medium">
                  ₹ {p.amount.toLocaleString()}
                </div>

                {p.status === "paid" ? (
                  <button
                    onClick={() =>
                      navigate(`/customer/payments/${p.id}`)
                    }
                    className="inline-flex items-center gap-1 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100"
                  >
                    <FaFileInvoice />
                    View Receipt
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      navigate("/customer/payments/pay", {
                        state: { paymentId: p.id },
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded hover:bg-orange-200"
                  >
                    <FaClock />
                    Pay Now
                    <FaArrowRight />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Notes */}
      <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-600">
        <h3 className="font-medium mb-2">Payment Notes</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li>Invoices will be shared after payment confirmation</li>
          <li>Pending payments must be cleared before event setup</li>
          <li>For billing support, contact the event team</li>
        </ul>
      </div>
    </div>
  );
}

/* ===============================
   Summary Card
================================ */
function SummaryCard({
  label,
  value,
  color = "gray",
}: {
  label: string;
  value: string;
  color?: "gray" | "green" | "orange";
}) {
  const styles = {
    gray: "border-gray-200",
    green: "border-green-300 bg-green-50 text-green-700",
    orange: "border-orange-300 bg-orange-50 text-orange-700",
  };

  return (
    <div className={`border rounded-xl p-4 ${styles[color]}`}>
      <div className="text-xs">{label}</div>
      <div className="text-xl font-semibold mt-1">
        {value}
      </div>
    </div>
  );
}
