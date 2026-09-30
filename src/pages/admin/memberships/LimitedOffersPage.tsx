import {
  Eye,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Clock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../utils/api";

type OfferStatus = "Active" | "Inactive" | "Expired";
type DiscountType = "Percentage" | "Flat";

type LimitedOffer = {
  _id: string;
  name: string;
  plan: { name: string };
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  status: OfferStatus;
};

export default function LimitedOffersPage() {
  const [offers, setOffers] = useState<LimitedOffer[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchOffers = async () => {
    try {
      const res = await api.get("/memberships/offers");
      setOffers(res.data);
    } catch {
      alert("Failed to load offers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  /* ================= TOGGLE ================= */
  const toggleStatus = async (id: string) => {
    await api.patch(`/memberships/offers/${id}/status`);
    setOffers((prev) =>
      prev.map((o) =>
        o._id === id
          ? {
              ...o,
              status: o.status === "Active" ? "Inactive" : "Active",
            }
          : o
      )
    );
  };

  /* ================= DELETE ================= */
  const deleteOffer = async (id: string) => {
    if (!confirm("Delete this offer?")) return;

    await api.delete(`/memberships/offers/${id}`);
    setOffers((prev) => prev.filter((o) => o._id !== id));
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading offers...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Limited Time Offers
          </h1>
          <p className="text-sm text-gray-500">
            Create urgency-driven promotions with strict controls
          </p>
        </div>

        <Link
          to="/memberships/offers/create"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-700"
        >
          + Create Offer
        </Link>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="text-left p-3">Offer</th>
              <th className="text-left p-3">Plan</th>
              <th className="text-left p-3">Discount</th>
              <th className="text-left p-3">Validity</th>
              <th className="text-left p-3">Usage</th>
              <th className="text-left p-3">Status</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {offers.map((offer) => {
              const usagePercent = Math.min(
                Math.round((offer.usedCount / offer.usageLimit) * 100),
                100
              );

              return (
                <tr
                  key={offer._id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="font-medium">{offer.name}</div>
                    <div className="text-xs text-gray-500">
                      {offer._id.slice(-6)}
                    </div>
                  </td>

                  <td className="p-3">{offer.plan?.name}</td>

                  <td className="p-3 font-semibold">
                    {offer.discountType === "Percentage"
                      ? `${offer.discountValue}%`
                      : `₹${offer.discountValue}`}
                  </td>

                  <td className="p-3 text-xs">
                    <div>
                      {new Date(offer.startDate).toLocaleDateString()}
                    </div>
                    <div className="text-gray-500">
                      to{" "}
                      {new Date(offer.endDate).toLocaleDateString()}
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="text-xs mb-1">
                      {offer.usedCount}/{offer.usageLimit}
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded">
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

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        offer.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : offer.status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {offer.status}
                    </span>
                  </td>

                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2 items-center">
                      <button className="p-1 hover:text-orange-600">
                        <Eye size={16} />
                      </button>

                      <button className="p-1 hover:text-blue-600">
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => deleteOffer(offer._id)}
                        className="p-1 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>

                      {offer.status !== "Expired" && (
                        <button
                          onClick={() => toggleStatus(offer._id)}
                          className="p-1"
                        >
                          {offer.status === "Active" ? (
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

                      <Clock size={16} className="text-orange-500" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500">
        Total offers: {offers.length}
      </div>
    </div>
  );
}
