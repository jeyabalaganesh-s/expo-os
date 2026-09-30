// src/pages/audit/PaymentLogsPage.tsx
import { Eye, AlertTriangle } from "lucide-react";

type PaymentStatus = "Success" | "Failed" | "Pending";

type PaymentLog = {
  id: string;
  transactionId: string;
  orderId: string;
  payerName: string;
  payerEmail: string;
  amount: number;
  gateway: string;
  method: string;
  status: PaymentStatus;
  errorCode?: string;
  ip: string;
  timestamp: string;
};

const LOGS: PaymentLog[] = [
  {
    id: "PL-001",
    transactionId: "rzp_pay_9sdf82",
    orderId: "order_JK82sd",
    payerName: "Arun Kumar",
    payerEmail: "arun@gmail.com",
    amount: 3000,
    gateway: "Razorpay",
    method: "UPI",
    status: "Success",
    ip: "103.21.45.12",
    timestamp: "27 Jan 2025 • 10:22 AM",
  },
  {
    id: "PL-002",
    transactionId: "rzp_pay_83kd92",
    orderId: "order_LS92dk",
    payerName: "ABC Foods Pvt Ltd",
    payerEmail: "accounts@abcfoods.com",
    amount: 50000,
    gateway: "Razorpay",
    method: "Card",
    status: "Pending",
    ip: "103.21.45.18",
    timestamp: "27 Jan 2025 • 11:05 AM",
  },
  {
    id: "PL-003",
    transactionId: "upi_txn_8821df",
    orderId: "order_UPI_772",
    payerName: "Spice World",
    payerEmail: "finance@spiceworld.com",
    amount: 45000,
    gateway: "UPI",
    method: "Bank Transfer",
    status: "Failed",
    errorCode: "BANK_DECLINED",
    ip: "103.21.45.30",
    timestamp: "26 Jan 2025 • 04:40 PM",
  },
];

const statusStyle: Record<PaymentStatus, string> = {
  Success: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
};

export default function PaymentLogsPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Payment Logs
        </h1>
        <p className="text-sm text-gray-500">
          Immutable log of all payment gateway transactions
        </p>
      </div>

      {/* ================= INFO BANNER ================= */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm text-orange-800">
        🔒 Payment logs are read-only and used for audits, reconciliation,
        and dispute investigation.
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search transaction / order / email"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Gateways</option>
          <option>Razorpay</option>
          <option>UPI</option>
          <option>Bank</option>
        </select>

        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* ================= PAYMENT LOGS TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Transaction</th>
              <th className="text-left p-3">Payer</th>
              <th className="text-left p-3">Gateway</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">IP</th>
              <th className="text-left p-3">Time</th>
              <th className="text-right p-3">Details</th>
            </tr>
          </thead>

          <tbody>
            {LOGS.map((log) => (
              <tr
                key={log.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">
                    {log.transactionId}
                  </div>
                  <div className="text-xs text-gray-500">
                    {log.orderId}
                  </div>
                </td>

                <td className="p-3">
                  <div className="font-medium">{log.payerName}</div>
                  <div className="text-xs text-gray-500">
                    {log.payerEmail}
                  </div>
                </td>

                <td className="p-3">
                  <div>{log.gateway}</div>
                  <div className="text-xs text-gray-500">
                    {log.method}
                  </div>
                </td>

                <td className="p-3 font-semibold">
                  ₹{log.amount.toLocaleString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[log.status]}`}
                  >
                    {log.status}
                  </span>
                  {log.status === "Failed" && (
                    <div className="text-xs text-red-600 flex items-center gap-1 mt-1">
                      <AlertTriangle size={12} />
                      {log.errorCode}
                    </div>
                  )}
                </td>

                <td className="p-3 font-mono text-xs">{log.ip}</td>

                <td className="p-3">{log.timestamp}</td>

                <td className="p-3 text-right">
                  <button
                    title="View Raw Log"
                    className="p-1 hover:text-orange-600"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {LOGS.length} payment log entries
      </div>
    </div>
  );
}
