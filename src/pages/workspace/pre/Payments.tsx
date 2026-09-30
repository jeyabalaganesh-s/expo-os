import { useEffect, useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import api from "../../../utils/api";
import {
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

/* ================= TYPES ================= */

type TransactionStatus =
  | "Success"
  | "Failed"
  | "Pending";

type Transaction = {
  _id: string;
  name: string;
  email: string;
  ticketName: string;
  amount: number;
  currency: string;
  gateway: string;
  paymentId: string;
  status: TransactionStatus;
  createdAt: string;
};

/* ================= COMPONENT ================= */

export default function Payments() {
  const [transactions, setTransactions] =
    useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= SLUG ================= */

  const url = window.location.href;
  const base = url.split("/workspace")[0];
  const slug = base.split("//")[1].split(".")[0];

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get(
        `/events/${slug}/payments/transactions`
      );
      setTransactions(res.data || []);
    } catch {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPERS ================= */

  const statusBadge = (status: TransactionStatus) => {
    switch (status) {
      case "Success":
        return (
          <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs">
            <CheckCircle size={12} />
            Success
          </span>
        );
      case "Failed":
        return (
          <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-0.5 rounded text-xs">
            <XCircle size={12} />
            Failed
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded text-xs">
            <Clock size={12} />
            Pending
          </span>
        );
    }
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="Payments"
      description="View payment transactions for this event"
    >
      {loading ? (
        <div className="text-sm text-gray-500">
          Loading transactions…
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-sm text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">
                  Attendee
                </th>
                <th className="px-4 py-3 text-left">
                  Ticket
                </th>
                <th className="px-4 py-3 text-left">
                  Amount
                </th>
                <th className="px-4 py-3 text-left">
                  Gateway
                </th>
                <th className="px-4 py-3 text-left">
                  Payment ID
                </th>
                <th className="px-4 py-3 text-left">
                  Status
                </th>
                <th className="px-4 py-3 text-left">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {tx.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tx.email}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    {tx.ticketName}
                  </td>

                  <td className="px-4 py-3 font-medium">
                    {tx.currency} {tx.amount}
                  </td>

                  <td className="px-4 py-3">
                    {tx.gateway}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500">
                    {tx.paymentId}
                  </td>

                  <td className="px-4 py-3">
                    {statusBadge(tx.status)}
                  </td>

                  <td className="px-4 py-3 text-xs text-gray-500">
                    {new Date(
                      tx.createdAt
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageShell>
  );
}
