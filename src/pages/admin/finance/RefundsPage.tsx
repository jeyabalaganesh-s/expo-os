// src/pages/finance/RefundsPage.tsx
import { Eye, CheckCircle, XCircle, FileText } from "lucide-react";

type RefundStatus = "Requested" | "Approved" | "Rejected" | "Processed";
type RefundFor = "Membership" | "Stall Booking" | "Webinar";

type Refund = {
  id: string;
  refundNo: string;
  customerName: string;
  customerEmail: string;
  refundFor: RefundFor;
  reference: string;
  originalAmount: number;
  refundAmount: number;
  reason: string;
  requestedOn: string;
  status: RefundStatus;
};

const REFUNDS: Refund[] = [
  {
    id: "RF-001",
    refundNo: "REF-2025-001",
    customerName: "Spice World",
    customerEmail: "finance@spiceworld.com",
    refundFor: "Stall Booking",
    reference: "STALL-B07",
    originalAmount: 45000,
    refundAmount: 45000,
    reason: "Event cancelled",
    requestedOn: "08 Jan 2025",
    status: "Processed",
  },
  {
    id: "RF-002",
    refundNo: "REF-2025-002",
    customerName: "Arun Kumar",
    customerEmail: "arun@gmail.com",
    refundFor: "Membership",
    reference: "MEM-2025-014",
    originalAmount: 3000,
    refundAmount: 1500,
    reason: "Duplicate payment",
    requestedOn: "10 Jan 2025",
    status: "Approved",
  },
  {
    id: "RF-003",
    refundNo: "REF-2025-003",
    customerName: "ABC Foods Pvt Ltd",
    customerEmail: "accounts@abcfoods.com",
    refundFor: "Stall Booking",
    reference: "STALL-A12",
    originalAmount: 50000,
    refundAmount: 0,
    reason: "Invalid request",
    requestedOn: "06 Jan 2025",
    status: "Rejected",
  },
];

const statusStyle: Record<RefundStatus, string> = {
  Requested: "bg-yellow-100 text-yellow-700",
  Approved: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
  Processed: "bg-green-100 text-green-700",
};

export default function RefundsPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Refunds
          </h1>
          <p className="text-sm text-gray-500">
            Review, approve, and process refund requests
          </p>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard title="Total Refunds" value="₹1,00,000" />
        <SummaryCard title="Pending Approval" value="₹25,000" />
        <SummaryCard title="Processed Refunds" value="₹75,000" />
        <SummaryCard title="Rejected Requests" value="3" />
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search customer / refund / reference"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Requested</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Processed</option>
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

      {/* ================= REFUNDS TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Refund</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Purpose</th>
              <th className="text-left p-3">Amounts</th>
              <th className="text-left p-3">Reason</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {REFUNDS.map((ref) => (
              <tr
                key={ref.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">
                    {ref.refundNo}
                  </div>
                  <div className="text-xs text-gray-500">
                    {ref.requestedOn}
                  </div>
                </td>

                <td className="p-3">
                  <div className="font-medium">
                    {ref.customerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {ref.customerEmail}
                  </div>
                </td>

                <td className="p-3">
                  <div>{ref.refundFor}</div>
                  <div className="text-xs text-gray-500">
                    {ref.reference}
                  </div>
                </td>

                <td className="p-3 text-xs">
                  <div>
                    Original: ₹{ref.originalAmount.toLocaleString()}
                  </div>
                  <div className="font-semibold">
                    Refund: ₹{ref.refundAmount.toLocaleString()}
                  </div>
                </td>

                <td className="p-3">{ref.reason}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[ref.status]}`}
                  >
                    {ref.status}
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

                    {ref.status === "Requested" && (
                      <>
                        <button
                          title="Approve"
                          className="p-1 hover:text-green-600"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          title="Reject"
                          className="p-1 hover:text-red-600"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}

                    {ref.status === "Approved" && (
                      <button
                        title="Process Refund"
                        className="p-1 hover:text-blue-600"
                      >
                        <FileText size={16} />
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
        Showing {REFUNDS.length} refund requests
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
