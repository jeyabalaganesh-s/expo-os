// src/pages/finance/PaymentsPage.tsx
import {
  Eye,
  FileText,
  RefreshCw,
  XCircle,
} from "lucide-react";

type PaymentStatus = "Success" | "Pending" | "Failed" | "Refunded";
type PaymentFor = "Membership" | "Stall Booking" | "Webinar";

type Payment = {
  id: string;
  payerName: string;
  payerEmail: string;
  amount: number;
  paymentFor: PaymentFor;
  reference: string;
  method: string;
  date: string;
  status: PaymentStatus;
};

const PAYMENTS: Payment[] = [
  {
    id: "PAY-001",
    payerName: "Arun Kumar",
    payerEmail: "arun@gmail.com",
    amount: 3000,
    paymentFor: "Membership",
    reference: "MEM-2025-001",
    method: "Razorpay",
    date: "05 Jan 2025",
    status: "Success",
  },
  {
    id: "PAY-002",
    payerName: "ABC Foods Pvt Ltd",
    payerEmail: "accounts@abcfoods.com",
    amount: 50000,
    paymentFor: "Stall Booking",
    reference: "STALL-A12",
    method: "Bank Transfer",
    date: "07 Jan 2025",
    status: "Pending",
  },
  {
    id: "PAY-003",
    payerName: "Dr. Priya Sharma",
    payerEmail: "priya@gmail.com",
    amount: 0,
    paymentFor: "Webinar",
    reference: "WEB-001",
    method: "Free",
    date: "18 Dec 2025",
    status: "Success",
  },
  {
    id: "PAY-004",
    payerName: "Spice World",
    payerEmail: "finance@spiceworld.com",
    amount: 45000,
    paymentFor: "Stall Booking",
    reference: "STALL-B07",
    method: "Razorpay",
    date: "03 Jan 2025",
    status: "Refunded",
  },
];

const statusStyle: Record<PaymentStatus, string> = {
  Success: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
  Refunded: "bg-blue-100 text-blue-700",
};

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Payments
          </h1>
          <p className="text-sm text-gray-500">
            Track all financial transactions across Expo OS
          </p>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard title="Total Collection" value="₹28,95,000" />
        <SummaryCard title="Today’s Collection" value="₹1,25,000" />
        <SummaryCard title="Pending Payments" value="₹3,40,000" />
        <SummaryCard title="Refunded Amount" value="₹1,00,000" />
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search name / email / reference"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
          <option>Refunded</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Types</option>
          <option>Membership</option>
          <option>Stall Booking</option>
          <option>Webinar</option>
        </select>

        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* ================= PAYMENTS TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Payment</th>
              <th className="text-left p-3">Payer</th>
              <th className="text-left p-3">Purpose</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Method</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {PAYMENTS.map((pay) => (
              <tr
                key={pay.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">{pay.id}</div>
                  <div className="text-xs text-gray-500">
                    {pay.date}
                  </div>
                </td>

                <td className="p-3">
                  <div className="font-medium">
                    {pay.payerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {pay.payerEmail}
                  </div>
                </td>

                <td className="p-3">
                  <div>{pay.paymentFor}</div>
                  <div className="text-xs text-gray-500">
                    {pay.reference}
                  </div>
                </td>

                <td className="p-3 font-semibold">
                  ₹{pay.amount.toLocaleString()}
                </td>

                <td className="p-3">{pay.method}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[pay.status]}`}
                  >
                    {pay.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      title="View Details"
                      className="p-1 hover:text-orange-600"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Invoice"
                      className="p-1 hover:text-blue-600"
                    >
                      <FileText size={16} />
                    </button>

                    {pay.status === "Pending" && (
                      <button
                        title="Retry Payment"
                        className="p-1 hover:text-green-600"
                      >
                        <RefreshCw size={16} />
                      </button>
                    )}

                    {pay.status === "Success" && (
                      <button
                        title="Refund"
                        className="p-1 hover:text-red-600"
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {PAYMENTS.length} payments
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-1">
        {value}
      </h2>
    </div>
  );
}
