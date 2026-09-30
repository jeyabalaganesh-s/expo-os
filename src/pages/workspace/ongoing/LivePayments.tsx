import { useEffect, useState } from "react";
import {
  IndianRupee,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
} from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */

type PaymentStats = {
  totalAmount: number;
  successCount: number;
  pendingCount: number;
  failedCount: number;
  lastPaymentAt?: string;
};

type Payment = {
  _id: string;
  name: string;
  email: string;
  amount: number;
  status: "success" | "pending" | "failed";
  method: string;
  createdAt: string;
};

/* ================= COMPONENT ================= */

export default function LivePaymentPage() {
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  const fetchPayments = async () => {
    try {
      const [statsRes, listRes] = await Promise.all([
        api.get("/event/payments/dashboard"),
        api.get("/event/payments", { params: { limit: 10 } }),
      ]);

      setStats(statsRes.data);
      setPayments(listRes.data);
    } catch (err) {
      console.error("Payment fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();

    // 🔁 Refresh every 8 seconds
    const interval = setInterval(fetchPayments, 8000);
    return () => clearInterval(interval);
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="text-sm text-gray-400">
        Loading live payments…
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-sm text-red-500">
        Payment data unavailable
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Live Payments
        </h1>
        <p className="text-sm text-gray-500">
          Real-time payment activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Stat
          label="Total Collected"
          value={`₹${stats.totalAmount.toLocaleString()}`}
          icon={IndianRupee}
          color="green"
        />

        <Stat
          label="Successful"
          value={stats.successCount}
          icon={CheckCircle}
          color="blue"
        />

        <Stat
          label="Pending"
          value={stats.pendingCount}
          icon={Clock}
          color="orange"
        />

        <Stat
          label="Failed"
          value={stats.failedCount}
          icon={XCircle}
          color="red"
        />
      </div>

      {/* PAYMENTS LIST */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Method</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Time</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr
                key={p._id}
                className="border-b last:border-0"
              >
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.email}</td>
                <td className="p-3">
                  ₹{p.amount.toLocaleString()}
                </td>
                <td className="p-3 flex items-center gap-1">
                  <CreditCard size={14} />
                  {p.method}
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      p.status === "success"
                        ? "bg-green-100 text-green-700"
                        : p.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-right text-xs text-gray-500">
                  {new Date(p.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      {stats.lastPaymentAt && (
        <div className="text-xs text-gray-400">
          Last payment:{" "}
          {new Date(stats.lastPaymentAt).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

/* ================= CARD ================= */

function Stat({
  label,
  value,
  icon: Icon,
  color,
}: any) {
  const colors: Record<string, string> = {
    green: "bg-green-50 text-green-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${colors[color]}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
