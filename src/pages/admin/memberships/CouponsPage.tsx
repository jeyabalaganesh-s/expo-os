import {
  Eye,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Copy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

type CouponStatus = "Active" | "Inactive" | "Expired";
type DiscountType = "Percentage" | "Flat";

type Coupon = {
  _id: string;
  code: string;
  plan?: { name: string };
  discountType: DiscountType;
  discountValue: number;
  usageLimit: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: CouponStatus;
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchCoupons = async () => {
    try {
      const res = await api.get("/memberships/coupons");
      setCoupons(res.data);
    } catch {
      alert("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  /* ================= TOGGLE ================= */
  const toggleStatus = async (id: string) => {
    await api.patch(`/memberships/coupons/${id}/status`);
    setCoupons((prev) =>
      prev.map((c) =>
        c._id === id
          ? {
              ...c,
              status: c.status === "Active" ? "Inactive" : "Active",
            }
          : c
      )
    );
  };

  /* ================= DELETE ================= */
  const deleteCoupon = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    await api.delete(`/memberships/coupons/${id}`);
    setCoupons((prev) => prev.filter((c) => c._id !== id));
  };

  /* ================= COPY ================= */
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied`);
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading coupons...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Coupons
          </h1>
          <p className="text-sm text-gray-500">
            Create and manage promo codes with usage limits
          </p>
        </div>

        <Link
          to="/memberships/coupons/create"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          + Create Coupon
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Coupon</th>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Discount</th>
              <th className="text-left p-3">Usage</th>
              <th className="text-left p-3">Validity</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((coupon) => {
              const usagePercent = Math.min(
                Math.round(
                  (coupon.usedCount / coupon.usageLimit) * 100
                ),
                100
              );

              return (
                <tr
                  key={coupon._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => copyCode(coupon.code)}
                        className="p-1 text-gray-500 hover:text-orange-600"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                    <div className="text-xs text-gray-500">
                      {coupon._id.slice(-6)}
                    </div>
                  </td>

                  <td className="p-3">
                    {coupon.plan?.name || "All Plans"}
                  </td>

                  <td className="p-3 font-semibold">
                    {coupon.discountType === "Percentage"
                      ? `${coupon.discountValue}%`
                      : `₹${coupon.discountValue}`}
                  </td>

                  <td className="p-3">
                    <div className="text-xs mb-1">
                      {coupon.usedCount}/{coupon.usageLimit}
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className={`h-2 rounded ${
                          usagePercent > 80
                            ? "bg-red-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${usagePercent}%` }}
                      />
                    </div>
                  </td>

                  <td className="p-3 text-xs">
                    <div>
                      {new Date(
                        coupon.validFrom
                      ).toLocaleDateString()}
                    </div>
                    <div className="text-gray-500">
                      to{" "}
                      {new Date(
                        coupon.validTo
                      ).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        coupon.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : coupon.status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {coupon.status}
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
                        onClick={() => deleteCoupon(coupon._id)}
                        className="p-1 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>

                      {coupon.status !== "Expired" && (
                        <button
                          onClick={() =>
                            toggleStatus(coupon._id)
                          }
                          className="p-1"
                        >
                          {coupon.status === "Active" ? (
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
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500">
        Total coupons: {coupons.length}
      </div>
    </div>
  );
}
