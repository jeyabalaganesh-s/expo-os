import {
  Eye,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

type RuleStatus = "Active" | "Inactive";
type DiscountType = "Percentage" | "Flat";

type PricingRule = {
  _id: string;
  name: string;
  plan: { name: string };
  discountType: DiscountType;
  discountValue: number;
  validFrom: string;
  validTo: string;
  conditions: string[];
  status: RuleStatus;
};

export default function PricingDetailsPage() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchRules = async () => {
    try {
      const res = await api.get("/memberships/pricing");
      setRules(res.data);
    } catch {
      alert("Failed to load pricing rules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  /* ================= TOGGLE ================= */
  const toggleStatus = async (id: string) => {
    await api.patch(`/memberships/pricing/${id}/status`);
    setRules((prev) =>
      prev.map((r) =>
        r._id === id
          ? {
              ...r,
              status: r.status === "Active" ? "Inactive" : "Active",
            }
          : r
      )
    );
  };

  /* ================= DELETE ================= */
  const deleteRule = async (id: string) => {
    if (!confirm("Delete this pricing rule?")) return;

    await api.delete(`/memberships/pricing/${id}`);
    setRules((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading pricing rules...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Pricing Details
          </h1>
          <p className="text-sm text-gray-500">
            Manage pricing rules, discounts, and limited-time offers
          </p>
        </div>

        <Link
          to="/memberships/pricing/create"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          + Create Pricing Rule
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Rule</th>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Discount</th>
              <th className="text-left p-3">Validity</th>
              <th className="text-left p-3">Conditions</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => (
              <tr
                key={rule._id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium">{rule.name}</div>
                  <div className="text-xs text-gray-500">
                    {rule._id.slice(-6)}
                  </div>
                </td>

                <td className="p-3">{rule.plan?.name}</td>

                <td className="p-3 font-semibold">
                  {rule.discountType === "Percentage"
                    ? `${rule.discountValue}%`
                    : `₹${rule.discountValue}`}
                </td>

                <td className="p-3 text-xs">
                  <div>
                    {new Date(rule.validFrom).toLocaleDateString()}
                  </div>
                  <div className="text-gray-500">
                    to{" "}
                    {new Date(rule.validTo).toLocaleDateString()}
                  </div>
                </td>

                <td className="p-3">
                  <ul className="list-disc ml-4 text-xs space-y-1">
                    {rule.conditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      rule.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {rule.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button className="p-1 hover:text-orange-600">
                      <Eye size={16} />
                    </button>

                    <button className="p-1 hover:text-blue-600">
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() => deleteRule(rule._id)}
                      className="p-1 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>

                    <button
                      onClick={() => toggleStatus(rule._id)}
                      className="p-1"
                    >
                      {rule.status === "Active" ? (
                        <ToggleRight
                          size={20}
                          className="text-green-600"
                        />
                      ) : (
                        <ToggleLeft
                          size={20}
                          className="text-gray-400"
                        />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500">
        Total pricing rules: {rules.length}
      </div>
    </div>
  );
}
