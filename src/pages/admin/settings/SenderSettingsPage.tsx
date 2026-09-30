import { useEffect, useState } from "react";
import api from "../../../utils/api";
import {
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

/* ================= TYPES ================= */

type SenderType = "email" | "domain";
type SenderStatus = "Active" | "Inactive";

type SenderIdentity = {
  _id: string;
  type: SenderType;
  value: string;
  status: SenderStatus;
};

/* ================= COMPONENT ================= */

export default function SenderSettingsPage() {
  const [senders, setSenders] = useState<SenderIdentity[]>([]);
  const [type, setType] = useState<SenderType>("email");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchSenders();
  }, []);

  const fetchSenders = async () => {
    const { data } = await api.get("/email-senders");
    setSenders(data);
  };

  /* ================= ADD ================= */

  const addSender = async () => {
    if (!value) return;

    setLoading(true);
    try {
      await api.post("/email-senders", {
        type,
        value,
        status: "Inactive", // default
      });

      setValue("");
      fetchSenders();
    } catch {
      alert("Failed to add sender");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleStatus = async (id: string, status: SenderStatus) => {
    await api.patch(`/email-senders/${id}/status`, {
      status: status === "Active" ? "Inactive" : "Active",
    });
    fetchSenders();
  };

  /* ================= DELETE ================= */

  const removeSender = async (id: string) => {
    if (!confirm("Remove this sender identity?")) return;
    await api.delete(`/email-senders/${id}`);
    fetchSenders();
  };

  /* ================= FILTER ================= */

  const filteredSenders = senders.filter((s) =>
    s.value.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= UI ================= */

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Sender Email & Domain
        </h1>
        <p className="text-sm text-gray-500">
          Control which sender identities are allowed for campaigns
        </p>
      </div>

      {/* ADD SENDER */}
      <div className="bg-white border rounded-xl p-4 space-y-4">
        <h2 className="font-medium text-sm">
          Add Sender Identity
        </h2>

        <div className="flex gap-3">
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as SenderType)
            }
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="email">Email</option>
            <option value="domain">Domain</option>
          </select>

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={
              type === "email"
                ? "noreply@yourdomain.com"
                : "yourdomain.com"
            }
            className="flex-1 border rounded px-3 py-2 text-sm"
          />

          <button
            onClick={addSender}
            disabled={loading}
            className="px-4 py-2 bg-orange-600 text-white rounded text-sm disabled:opacity-50"
          >
            <Plus size={14} className="inline mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex justify-between items-center">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sender..."
          className="border rounded px-3 py-2 text-sm w-64"
        />
      </div>

      {/* LIST */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Value</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredSenders.map((s) => (
              <tr key={s._id} className="border-b">
                <td className="p-3 capitalize">
                  {s.type}
                </td>

                <td className="p-3">
                  {s.value}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      s.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>

                <td className="p-3 text-right space-x-3">
                  {/* TOGGLE */}
                  <button
                    onClick={() =>
                      toggleStatus(s._id, s.status)
                    }
                    title="Toggle Active / Inactive"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {s.status === "Active" ? (
                      <ToggleRight size={18} />
                    ) : (
                      <ToggleLeft size={18} />
                    )}
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => removeSender(s._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredSenders.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500"
                >
                  No sender identities found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="text-xs text-gray-500">
        ✔ Only <strong>Active</strong> senders will appear
        in email campaigns
      </div>
    </div>
  );
}
