// src/pages/memberships/MembershipPlansPage.tsx
import { Edit, Eye, ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

type PlanStatus = "Active" | "Inactive";

type MembershipPlan = {
  _id: string;
  name: string;
  price: number;
  validityMonths: number;
  benefits: string[];
  status: PlanStatus;
  createdAt: string;
};

export default function MembershipPlansPage() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PLANS ================= */
  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await api.get("/memberships/plans");
      setPlans(res.data);
    } catch (err) {
      setError("Failed to load membership plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  /* ================= TOGGLE STATUS ================= */
  const toggleStatus = async (id: string) => {
    try {
      await api.patch(`/memberships/plans/${id}/status`);
      setPlans((prev) =>
        prev.map((p) =>
          p._id === id
            ? {
                ...p,
                status: p.status === "Active" ? "Inactive" : "Active",
              }
            : p
        )
      );
    } catch (err) {
      alert("Failed to update plan status");
    }
  };

  /* ================= STATES ================= */
  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading plans...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Membership Plans
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage membership pricing & benefits
          </p>
        </div>

        <Link
          to="/memberships/plans/create"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          + Create Plan
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Validity</th>
              <th className="text-left p-3">Benefits</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Created</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {plans.map((plan) => (
              <tr
                key={plan._id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3">
                  <div className="font-medium text-gray-900">
                    {plan.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {plan._id.slice(-6)}
                  </div>
                </td>

                <td className="p-3 font-semibold">
                  ₹{plan.price.toLocaleString()}
                </td>

                <td className="p-3">{plan.validityMonths} months</td>

                <td className="p-3">
                  <ul className="list-disc ml-4 text-xs text-gray-600 space-y-1">
                    {plan.benefits.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plan.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {plan.status}
                  </span>
                </td>

                <td className="p-3">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2 items-center">
                    <button className="p-1 hover:text-orange-600" title="View">
                      <Eye size={16} />
                    </button>

                    <button className="p-1 hover:text-blue-600" title="Edit">
                      <Edit size={16} />
                    </button>

                    <button
                      title="Toggle Status"
                      onClick={() => toggleStatus(plan._id)}
                      className="p-1"
                    >
                      {plan.status === "Active" ? (
                        <ToggleRight size={20} className="text-green-600" />
                      ) : (
                        <ToggleLeft size={20} className="text-gray-400" />
                      )}
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
        Total plans: {plans.length}
      </div>
    </div>
  );
}
