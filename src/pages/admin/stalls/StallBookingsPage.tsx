// src/pages/stalls/StallBookingsPage.tsx
import { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle, FileText } from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */
type BookingStatus = "Pending" | "Confirmed" | "Cancelled";

type Booking = {
  _id: string;
  bookingId: string;
  company: string;
  contactPerson: string;
  mobile: string;
  stall: string;
  eventName: string;
  amount: number;
  status: BookingStatus;
  createdAt: string;
  invoiceUrl?: string;
};

const statusStyle: Record<BookingStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function StallBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FILTERS ================= */
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [event, setEvent] = useState("All");

  /* ================= FETCH ================= */
  const fetchBookings = async () => {
    setLoading(true);
    const { data } = await api.get("/admin/stall-bookings", {
      params: { search, status, event },
    });
    setBookings(data);
    setLoading(false);
  };

  useEffect(() => {
    setEvent("All");
    fetchBookings();
  }, [search, status, event]);

  /* ================= ACTIONS ================= */
  const updateStatus = async (
    id: string,
    newStatus: BookingStatus
  ) => {
    await api.put(`/admin/stall-bookings/${id}/status`, {
      status: newStatus,
    });
    fetchBookings();
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Stall Bookings
        </h1>
        <p className="text-sm text-gray-500">
          Track and manage stall bookings
        </p>
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-lg p-4 flex gap-3">
        <input
          placeholder="Search company / stall / mobile"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 text-sm w-64"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border px-3 py-2 text-sm"
        >
          <option>All</option>
          <option>Pending</option>
          <option>Confirmed</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Booking</th>
              <th className="p-3 text-left">Company</th>
              <th className="p-3 text-left">Stall</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-medium">{b.bookingId}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </div>
                </td>

                <td className="p-3">
                  <div className="font-medium">{b.company}</div>
                  <div className="text-xs text-gray-500">
                    {b.contactPerson} • {b.mobile}
                  </div>
                </td>

                <td className="p-3 font-semibold">{b.stall}</td>
                <td className="p-3">{b.eventName}</td>

                <td className="p-3 font-semibold">
                  ₹{b.amount.toLocaleString()}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${statusStyle[b.status]}`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <div className="inline-flex gap-2">
                    <button title="View">
                      <Eye size={16} />
                    </button>

                    {b.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(b._id, "Confirmed")
                          }
                          title="Confirm"
                          className="hover:text-green-600"
                        >
                          <CheckCircle size={16} />
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(b._id, "Cancelled")
                          }
                          title="Cancel"
                          className="hover:text-red-600"
                        >
                          <XCircle size={16} />
                        </button>
                      </>
                    )}

                    {b.invoiceUrl && (
                      <a
                        href={b.invoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FileText size={16} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-500">
        Showing {bookings.length} bookings
      </div>
    </div>
  );
}
