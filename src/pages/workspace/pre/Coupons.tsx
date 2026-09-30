import { useState } from "react";
import PageShell from "../../../components/workspace/PageShell";
import {
  Plus,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  CalendarDays,
  Percent,
  IndianRupee,
} from "lucide-react";

/* ================= TYPES ================= */

type DiscountType = "percentage" | "flat";
type CouponStatus = "Active" | "Inactive" | "Expired";

type Coupon = {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: CouponStatus;
};

/* ================= COMPONENT ================= */

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "EARLY50",
      discountType: "percentage",
      discountValue: 50,
      usageLimit: 100,
      usedCount: 23,
      validFrom: "2026-01-01",
      validTo: "2026-01-10",
      status: "Active",
    },
    {
      id: "2",
      code: "VIP500",
      discountType: "flat",
      discountValue: 500,
      usageLimit: 50,
      usedCount: 50,
      validFrom: "2026-01-01",
      validTo: "2026-01-05",
      status: "Expired",
    },
  ]);

  /* ================= ACTIONS (UI ONLY) ================= */

  const toggleStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status:
                c.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : c
      )
    );
  };

  const removeCoupon = (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    setCoupons((prev) =>
      prev.filter((c) => c.id !== id)
    );
  };

  /* ================= UI ================= */

  return (
    <PageShell
      title="Coupons & Discounts"
      description="Create and manage discount coupons for event tickets"
    >
      {/* HEADER ACTION */}
      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
          <Plus size={14} />
          Create Coupon
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Code</th>
              <th className="p-3 text-left">Discount</th>
              <th className="p-3 text-left">Usage</th>
              <th className="p-3 text-left">Validity</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((c) => (
              <tr
                key={c.id}
                className="border-b last:border-0 hover:bg-gray-50"
              >
                {/* CODE */}
                <td className="p-3 font-medium">
                  {c.code}
                </td>

                {/* DISCOUNT */}
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    {c.discountType ===
                    "percentage" ? (
                      <>
                        <Percent size={14} />
                        {c.discountValue}%
                      </>
                    ) : (
                      <>
                        <IndianRupee size={14} />
                        {c.discountValue}
                      </>
                    )}
                  </div>
                </td>

                {/* USAGE */}
                <td className="p-3 text-xs text-gray-600">
                  {c.usedCount} / {c.usageLimit}
                </td>

                {/* VALIDITY */}
                <td className="p-3 text-xs">
                  <div className="flex items-center gap-1">
                    <CalendarDays size={12} />
                    {c.validFrom} → {c.validTo}
                  </div>
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Inactive"
                        ? "bg-gray-100 text-gray-600"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button
                      onClick={() => toggleStatus(c.id)}
                      title="Toggle status"
                    >
                      {c.status ===
                      "Active" ? (
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

                    <button
                      className="p-1 hover:text-blue-600"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>

                    <button
                      onClick={() =>
                        removeCoupon(c.id)
                      }
                      className="p-1 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {coupons.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No coupons created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}
