import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/api";

/* ================= TYPES ================= */
type StallStatus = "available" | "blocked";

export default function CreateStallPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  /* ================= FORM ================= */
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState(50000);
  const [status, setStatus] = useState<StallStatus>("available");

  /* ================= BULK ================= */
  const [bulkCount, setBulkCount] = useState(48);
  const [bulkPrefix, setBulkPrefix] = useState("A");

  /* ================= SINGLE CREATE ================= */
  const createSingle = async () => {
    if (!label) {
      alert("Stall label required");
      return;
    }

    setLoading(true);
    try {
      await api.post("/admin/stalls", {
        eventId,
        label,
        price,
        status,
      });

      alert("Stall created");
      navigate(-1);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= BULK CREATE ================= */
  const createBulk = async () => {
    if (!bulkCount || bulkCount < 1) return;

    setLoading(true);
    try {
      await api.post(`/admin/stalls/seed/${eventId}`, {
        count: bulkCount,
        price,
        prefix: bulkPrefix,
      });

      alert("Stalls created");
      navigate(-1);
    } catch {
      alert("Failed to create stalls");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Create Stalls</h1>
        <p className="text-sm text-gray-500">
          Add stalls for this event
        </p>
      </div>

      {/* SINGLE STALL */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Create Single Stall</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Stall Label (eg: A1)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border rounded px-3 py-2 text-sm"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StallStatus)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="available">Available</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>

        <button
          onClick={createSingle}
          disabled={loading}
          className="bg-orange-600 text-white px-5 py-2 rounded text-sm"
        >
          Create Stall
        </button>
      </div>

      {/* BULK CREATE */}
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h2 className="font-semibold">Bulk Create Stalls</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            value={bulkCount}
            onChange={(e) => setBulkCount(Number(e.target.value))}
            placeholder="Total stalls"
            className="border rounded px-3 py-2 text-sm"
          />

          <input
            value={bulkPrefix}
            onChange={(e) => setBulkPrefix(e.target.value)}
            placeholder="Prefix (A, B, C)"
            className="border rounded px-3 py-2 text-sm"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={createBulk}
          disabled={loading}
          className="border px-5 py-2 rounded text-sm"
        >
          Bulk Create
        </button>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate(-1)}
          className="border px-4 py-2 rounded text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
