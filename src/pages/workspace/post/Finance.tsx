import { useEffect, useState } from "react";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Wallet,
  FileText,
} from "lucide-react";

/* ================= TYPES ================= */

type PaymentSummary = {
  paid: number;
  pending: number;
  failed: number;
  refunded: number;
};

type Expense = {
  id: string;
  title: string;
  amount: number;
};

type FinanceData = {
  payments: PaymentSummary;
  expenses: Expense[];
};

/* ================= MOCK DATA ================= */

const INITIAL_FINANCE: FinanceData = {
  payments: {
    paid: 345000,
    pending: 12000,
    failed: 8000,
    refunded: 15000,
  },
  expenses: [
    { id: "e1", title: "Venue Rent", amount: 120000 },
    { id: "e2", title: "Marketing & Ads", amount: 45000 },
    { id: "e3", title: "Speakers & Logistics", amount: 60000 },
  ],
};

/* ================= COMPONENT ================= */

export default function WorkspaceFinance() {
  const [finance, setFinance] = useState<FinanceData | null>(
    null
  );

  /* ================= INIT ================= */

  useEffect(() => {
    const saved = localStorage.getItem("event_finance");
    setFinance(
      saved ? JSON.parse(saved) : INITIAL_FINANCE
    );
  }, []);

  if (!finance) return null;

  const totalRevenue = finance.payments.paid;
  const totalExpenses = finance.expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );
  const net = totalRevenue - totalExpenses;

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Finance
        </h1>
        <p className="text-sm text-gray-500">
          Post-event financial summary
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          icon={IndianRupee}
        />
        <SummaryCard
          label="Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={Wallet}
        />
        <SummaryCard
          label="Net Result"
          value={`₹${net.toLocaleString()}`}
          icon={net >= 0 ? TrendingUp : TrendingDown}
          positive={net >= 0}
        />
        <SummaryCard
          label="Refunded"
          value={`₹${finance.payments.refunded.toLocaleString()}`}
          icon={FileText}
        />
      </div>

      {/* PAYMENT BREAKDOWN */}
      <div className="bg-white border rounded-xl p-4 space-y-3">
        <h3 className="font-medium text-gray-900">
          Payment Breakdown
        </h3>

        <BreakdownRow
          label="Paid"
          value={finance.payments.paid}
        />
        <BreakdownRow
          label="Pending"
          value={finance.payments.pending}
        />
        <BreakdownRow
          label="Failed"
          value={finance.payments.failed}
        />
        <BreakdownRow
          label="Refunded"
          value={finance.payments.refunded}
        />
      </div>

      {/* EXPENSES */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Expense</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>

          <tbody>
            {finance.expenses.map((e) => (
              <tr
                key={e.id}
                className="border-b last:border-0"
              >
                <td className="p-3">{e.title}</td>
                <td className="p-3 text-right">
                  ₹{e.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="bg-gray-50 border border-dashed rounded-xl p-4 text-sm text-gray-600">
        This finance report is locked as part of the
        post-event archive. Any adjustments should be
        documented separately.
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SummaryCard({
  label,
  value,
  icon: Icon,
  positive = true,
}: any) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
      <div
        className={`p-3 rounded-lg ${
          positive
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        <Icon size={20} />
      </div>

      <div>
        <div className="text-xs text-gray-500">
          {label}
        </div>
        <div className="text-xl font-semibold">
          {value}
        </div>
      </div>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span>{label}</span>
      <span>₹{value.toLocaleString()}</span>
    </div>
  );
}
