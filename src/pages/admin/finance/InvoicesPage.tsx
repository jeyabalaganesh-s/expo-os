// src/pages/finance/InvoicesPage.tsx
import { Eye, Download, Send, FileText } from "lucide-react";

type InvoiceStatus = "Paid" | "Pending" | "Cancelled";
type InvoiceType = "Membership" | "Stall Booking" | "Webinar";

type Invoice = {
  id: string;
  invoiceNo: string;
  customerName: string;
  customerEmail: string;
  type: InvoiceType;
  reference: string;
  amount: number;
  issuedOn: string;
  dueDate: string;
  status: InvoiceStatus;
};

const INVOICES: Invoice[] = [
  {
    id: "INV-001",
    invoiceNo: "EXPO-INV-2025-001",
    customerName: "Arun Kumar",
    customerEmail: "arun@gmail.com",
    type: "Membership",
    reference: "MEM-2025-001",
    amount: 3000,
    issuedOn: "05 Jan 2025",
    dueDate: "05 Jan 2025",
    status: "Paid",
  },
  {
    id: "INV-002",
    invoiceNo: "EXPO-INV-2025-002",
    customerName: "ABC Foods Pvt Ltd",
    customerEmail: "accounts@abcfoods.com",
    type: "Stall Booking",
    reference: "STALL-A12",
    amount: 50000,
    issuedOn: "07 Jan 2025",
    dueDate: "10 Jan 2025",
    status: "Pending",
  },
  {
    id: "INV-003",
    invoiceNo: "EXPO-INV-2025-003",
    customerName: "Spice World",
    customerEmail: "finance@spiceworld.com",
    type: "Stall Booking",
    reference: "STALL-B07",
    amount: 45000,
    issuedOn: "02 Jan 2025",
    dueDate: "02 Jan 2025",
    status: "Cancelled",
  },
];

const statusStyle: Record<InvoiceStatus, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Invoices
          </h1>
          <p className="text-sm text-gray-500">
            Generate, send, and manage all invoices
          </p>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Total Invoices" value="1,248" />
        <SummaryCard title="Pending Amount" value="₹3,40,000" />
        <SummaryCard title="Paid Amount" value="₹28,95,000" />
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          placeholder="Search invoice / customer / reference"
          className="border rounded-md px-3 py-2 text-sm w-64"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Cancelled</option>
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

      {/* ================= INVOICES TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Invoice</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Issued / Due</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {INVOICES.map((inv) => (
              <tr
                key={inv.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">
                    {inv.invoiceNo}
                  </div>
                  <div className="text-xs text-gray-500">
                    {inv.reference}
                  </div>
                </td>

                <td className="p-3">
                  <div className="font-medium">
                    {inv.customerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {inv.customerEmail}
                  </div>
                </td>

                <td className="p-3">{inv.type}</td>

                <td className="p-3 font-semibold">
                  ₹{inv.amount.toLocaleString()}
                </td>

                <td className="p-3 text-xs">
                  <div>{inv.issuedOn}</div>
                  <div className="text-gray-500">
                    Due: {inv.dueDate}
                  </div>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle[inv.status]}`}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      title="View Invoice"
                      className="p-1 hover:text-orange-600"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      title="Download PDF"
                      className="p-1 hover:text-blue-600"
                    >
                      <Download size={16} />
                    </button>

                    <button
                      title="Send Email"
                      className="p-1 hover:text-green-600"
                    >
                      <Send size={16} />
                    </button>

                    <button
                      title="Generate Credit Note"
                      className="p-1 hover:text-gray-600"
                    >
                      <FileText size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {INVOICES.length} invoices
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
