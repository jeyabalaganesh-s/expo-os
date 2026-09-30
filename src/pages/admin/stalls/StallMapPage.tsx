// src/pages/stalls/StallMapPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Lock, CheckCircle, Plus } from "lucide-react";
import api from "../../../utils/api";

/* ================= TYPES ================= */
type StallStatus = "available" | "booked" | "blocked";

type Stall = {
  _id: string;
  label: string;
  price: number;
  status: StallStatus;
};

const statusStyle: Record<StallStatus, string> = {
  available: "bg-green-100 border-green-400 text-green-700",
  booked: "bg-blue-100 border-blue-400 text-blue-700",
  blocked: "bg-red-100 border-red-400 text-red-700",
};

export default function StallMapPage() {
  const { eventId } = useParams();
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [selected, setSelected] = useState<Stall | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchStalls = async () => {
    setLoading(true);
    const { data } = await api.get(`/admin/stalls/${eventId}`);
    setStalls(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStalls();
  }, [eventId]);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (status: StallStatus) => {
    if (!selected) return;

    await api.put(`/admin/stalls/${selected._id}/status`, {
      status,
    });

    setSelected(null);
    fetchStalls();
  };

  if (loading) return <div>Loading stall map...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Stall Map
          </h1>
          <p className="text-sm text-gray-500">
            Real-time stall availability
          </p>
        </div>

        <div className="flex gap-3 text-sm">
          <Legend color="bg-green-400" label="Available" />
          <Legend color="bg-blue-400" label="Booked" />
          <Legend color="bg-red-400" label="Blocked" />
        </div>
      </div>

      {/* GRID */}
      <div className="bg-white border rounded-xl p-6">
        <div className="grid grid-cols-6 md:grid-cols-8 gap-4">
          {stalls.map((stall) => (
            <button
              key={stall._id}
              onClick={() => setSelected(stall)}
              className={`relative h-20 rounded-lg border text-sm font-medium flex flex-col items-center justify-center ${statusStyle[stall.status]}`}
            >
              <span>{stall.label}</span>
              <span className="text-xs">
                ₹{stall.price.toLocaleString()}
              </span>

              {stall.status === "booked" && (
                <CheckCircle size={16} className="absolute top-1 right-1" />
              )}

              {stall.status === "blocked" && (
                <Lock size={16} className="absolute top-1 right-1" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* SIDE PANEL */}
      {selected && (
        <div className="fixed right-6 top-24 w-80 bg-white border rounded-xl p-5 shadow-lg z-50">
          <h3 className="font-semibold mb-2">
            Stall {selected.label}
          </h3>

          <p className="text-sm text-gray-600 mb-4">
            Price: ₹{selected.price.toLocaleString()}
          </p>

          <div className="space-y-2">
            <button
              onClick={() => updateStatus("available")}
              className="w-full px-4 py-2 border rounded hover:bg-green-50 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Mark Available
            </button>

            <button
              onClick={() => updateStatus("booked")}
              className="w-full px-4 py-2 border rounded hover:bg-blue-50 flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              Mark Booked
            </button>

            <button
              onClick={() => updateStatus("blocked")}
              className="w-full px-4 py-2 border rounded hover:bg-red-50 flex items-center justify-center gap-2 text-red-600"
            >
              <Lock size={16} />
              Block Stall
            </button>

            <button
              onClick={() => setSelected(null)}
              className="w-full px-4 py-2 text-sm text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= LEGEND ================= */
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded ${color}`} />
      <span>{label}</span>
    </div>
  );
}
