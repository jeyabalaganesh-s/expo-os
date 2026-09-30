// src/pages/stalls/StallPricingPage.tsx
import { Edit, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import { useState } from "react";

type PricingStatus = "Active" | "Inactive";

type StallPricing = {
  id: string;
  zone: string;
  size: string;
  basePrice: number;
  premiumPrice?: number;
  status: PricingStatus;
};

const INITIAL_PRICING: StallPricing[] = [
  {
    id: "SP-001",
    zone: "Zone A",
    size: "3x3 m",
    basePrice: 50000,
    premiumPrice: 65000,
    status: "Active",
  },
  {
    id: "SP-002",
    zone: "Zone B",
    size: "3x3 m",
    basePrice: 40000,
    premiumPrice: 55000,
    status: "Active",
  },
  {
    id: "SP-003",
    zone: "Zone C",
    size: "3x3 m",
    basePrice: 30000,
    status: "Inactive",
  },
];

export default function StallPricingPage() {
  const [pricing, setPricing] = useState(INITIAL_PRICING);

  const toggleStatus = (id: string) => {
    setPricing((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "Active" ? "Inactive" : "Active",
            }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Stall Pricing
          </h1>
          <p className="text-sm text-gray-500">
            Configure pricing based on zone, size, and premium stalls
          </p>
        </div>

        <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700 flex items-center gap-2">
          <Plus size={16} />
          Add Pricing Rule
        </button>
      </div>

      {/* ================= PRICING TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Zone</th>
              <th className="text-left p-3">Stall Size</th>
              <th className="text-left p-3">Base Price</th>
              <th className="text-left p-3">Premium Price</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pricing.map((rule) => (
              <tr
                key={rule.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                <td className="p-3 font-medium">{rule.zone}</td>

                <td className="p-3">{rule.size}</td>

                <td className="p-3 font-semibold">
                  ₹{rule.basePrice.toLocaleString()}
                </td>

                <td className="p-3">
                  {rule.premiumPrice ? (
                    <span className="font-semibold">
                      ₹{rule.premiumPrice.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      —
                    </span>
                  )}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {rule.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2 items-center">
                    <button
                      title="Edit"
                      className="p-1 hover:text-blue-600"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      title="Toggle Status"
                      onClick={() => toggleStatus(rule.id)}
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

      {/* ================= FOOTER ================= */}
      <div className="text-sm text-gray-500">
        Total pricing rules: {pricing.length}
      </div>
    </div>
  );
}
