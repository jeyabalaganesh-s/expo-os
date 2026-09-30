// src/pages/reports/RevenueReportPage.tsx
import { Wallet, TrendingUp, CreditCard, CalendarDays } from "lucide-react";

type RevenueSource =
  | "Membership"
  | "Stall Booking"
  | "Webinar"
  | "Other";

type RevenueRow = {
  id: string;
  source: RevenueSource;
  reference: string;
  payer: string;
  amount: number;
  paymentMethod: string;
  date: string;
};

const REVENUE_DATA: RevenueRow[] = [
  {
    id: "REV-001",
    source: "Membership",
    reference: "MEM-2025-001",
    payer: "Arun Kumar",
    amount: 3000,
    paymentMethod: "Razorpay",
    date: "05 Jan 2025",
  },
  {
    id: "REV-002",
    source: "Stall Booking",
    reference: "STALL-A12",
    payer: "ABC Foods Pvt Ltd",
    amount: 50000,
    paymentMethod: "Bank Transfer",
    date: "07 Jan 2025",
  },
  {
    id: "REV-003",
    source: "Webinar",
    reference: "WEB-001",
    payer: "Dr. Priya Sharma",
    amount: 0,
    paymentMethod: "Free",
    date: "18 Dec 2025",
  },
  {
    id: "REV-004",
    source: "Stall Booking",
    reference: "STALL-B07",
    payer: "Spice World",
    amount: 45000,
    paymentMethod: "Razorpay",
    date: "03 Jan 2025",
  },
];

export default function RevenueReportPage() {
  const totalRevenue = REVENUE_DATA.reduce(
    (sum, r) => sum + r.amount,
    0
  );

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Revenue Report
        </h1>
        <p className="text-sm text-gray-500">
          Consolidated revenue across all Expo OS modules
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={<Wallet size={20} />}
        />
        <SummaryCard
          title="Membership Revenue"
          value="₹97,35,000"
          icon={<TrendingUp size={20} />}
        />
        <SummaryCard
          title="Event & Stall Revenue"
          value="₹2,45,80,000"
          icon={<CalendarDays size={20} />}
        />
        <SummaryCard
          title="Online Payments"
          value="₹1,88,40,000"
          icon={<CreditCard size={20} />}
        />
      </div>

      {/* ================= FILTER BAR ================= */}
      <div className="bg-white border rounded-lg p-4 flex flex-wrap gap-3">
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
        />

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Sources</option>
          <option>Membership</option>
          <option>Stall Booking</option>
          <option>Webinar</option>
        </select>

        <select className="border rounded-md px-3 py-2 text-sm">
          <option>All Payment Methods</option>
          <option>Razorpay</option>
          <option>Bank Transfer</option>
          <option>UPI</option>
        </select>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700">
          Apply Filters
        </button>
      </div>

      {/* ================= REVENUE TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Source</th>
              <th className="text-left p-3">Reference</th>
              <th className="text-left p-3">Payer</th>
              <th className="text-left p-3">Payment Method</th>
              <th className="text-right p-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {REVENUE_DATA.map((row) => (
              <tr
                key={row.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">{row.date}</td>
                <td className="p-3">{row.source}</td>
                <td className="p-3">{row.reference}</td>
                <td className="p-3">{row.payer}</td>
                <td className="p-3">{row.paymentMethod}</td>
                <td className="p-3 text-right font-semibold">
                  ₹{row.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Showing {REVENUE_DATA.length} revenue records
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-900 mt-1">
          {value}
        </h2>
      </div>
      <div className="text-orange-600">{icon}</div>
    </div>
  );
}
